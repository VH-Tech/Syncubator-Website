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
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 3306;

// Middleware
app.use(bodyParser.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to MongoDB
connectDB();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'public/uploads');
        console.log('Upload directory:', uploadDir);
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
        console.log('Generated filename:', filename);
        cb(null, filename);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            return cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed!'), false);
        }
    }
}).single('image');

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
app.post('/api/postItems', authenticateToken, handleUpload, async (req, res) => {
    try {
        const { title, description, link, imageType } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ message: 'Image is required' });
        }

        // Log the full file path and URL
        const fullFilePath = path.join(__dirname, 'public/uploads', req.file.filename);
        const imageUrl = `/uploads/${req.file.filename}`;
        
        console.log('Full file path:', fullFilePath);
        console.log('File exists:', fs.existsSync(fullFilePath));
        console.log('Image URL:', imageUrl);
        console.log('File details:', req.file);

        const newPost = await PostItem.create({ 
            img: imageUrl,
            title, 
            description, 
            link, 
            imageType: imageType || 'cover' 
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error in POST /api/postItems:', error);
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
