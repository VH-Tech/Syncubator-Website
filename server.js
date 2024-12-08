// server.js
import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db.js';
import PostItem from './models/postItem.js';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import AWS from 'aws-sdk';
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 3306;

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: ['https://syncubator.in', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to MongoDB
connectDB();

// Configure S3 for file uploads
const s3 = new AWS.S3();

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Temporarily store in memory
const upload = multer({ storage: storage });

// Add custom error handling middleware for file uploads
const handleUpload = (req, res, next) => {
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            // Multer error (e.g., file too large)
            return res.status(400).json({ 
                status: 'error',
                message: `Upload error: ${err.message}`
            });
        } else if (err) {
            // Other errors (e.g., file type)
            return res.status(400).json({ 
                status: 'error',
                message: err.message
            });
        }
        next();
    });
};

// Serve static files
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Add middleware to verify token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Routes

// GET all posts
app.get('/api/getItems', async (req, res) => {
    try {
        const posts = await PostItem.findAll();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST a new post
app.post('/api/postItems', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        const s3Params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `uploads/${Date.now()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read'
        };

        const s3Upload = await s3.upload(s3Params).promise();
        const imageUrl = s3Upload.Location;

        // Create database entry with S3 URL
        const newPost = await PostItem.create({
            img: imageUrl,
            title: req.body.title,
            description: req.body.description,
            link: req.body.link,
            imageType: req.body.imageType || 'cover'
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// DELETE a post by ID
app.delete('/api/deleteItem/:id', authenticateToken, async (req, res) => {
    try {
        const deleted = await PostItem.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error in DELETE /api/deleteItem:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// UPDATE a post by ID
app.put('/api/updateItem/:id', authenticateToken, handleUpload, async (req, res) => {
    try {
        const { title, description, link, imageType } = req.body;
        
        // Prepare update data
        const updateData = {
            title,
            description,
            link,
            imageType
        };

        // If a new image was uploaded, update the image path
        if (req.file) {
            const imageUrl = `/uploads/${req.file.filename}`;
            updateData.img = imageUrl;
        }

        const [updated] = await PostItem.update(
            updateData,
            { where: { id: req.params.id } }
        );
        
        if (!updated) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        const updatedPost = await PostItem.findByPk(req.params.id);
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error in PUT /api/updateItem:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Replace with your admin credentials verification
    if (username === process.env.ADMIN_USERNAME && 
        password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign(
            { username: username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
