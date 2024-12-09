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
import https from 'https';
dotenv.config();

// Initialize app
const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add error handling for CORS preflight
app.options('*', cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to MongoDB
connectDB();

// Serve static files - add this before your routes
app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
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

// Add a route to check if files exist
app.get('/check-file/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    console.log('Checking file:', filePath);
    if (fs.existsSync(filePath)) {
        res.json({ exists: true, path: filePath });
    } else {
        res.json({ exists: false, path: filePath });
    }
});

// Add middleware to verify token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            message: 'Access denied',
            error: 'No token provided'
        });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(403).json({ 
            message: 'Invalid token',
            error: err.message
        });
    }
};

// Routes

// Public routes (no authentication needed)
app.get('/api/getItems', async (req, res) => {
    try {
        const posts = await PostItem.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ 
            message: 'Server Error',
            error: error.message 
        });
    }
});

// Protected routes (need authentication)
app.post('/api/postItems', authenticateToken, (req, res) => {
    upload(req, res, async function(err) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const { title, description, link, imageType } = req.body;
            
            if (!req.file) {
                return res.status(400).json({ message: 'Image is required' });
            }

            const baseUrl = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
            const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

            const newPost = new PostItem({
                img: imageUrl,
                title,
                description,
                link,
                imageType: imageType || 'cover'
            });

            await newPost.save();
            res.status(201).json(newPost);
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ message: 'Server Error', error: error.message });
        }
    });
});

// DELETE a post by ID
app.delete('/api/deleteItem/:id', authenticateToken, async (req, res) => {
    try {
        const deleted = await PostItem.findByIdAndDelete(req.params.id);
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
app.put('/api/updateItem/:id', authenticateToken, (req, res) => {
    upload(req, res, async function(err) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const updateData = {
                title: req.body.title,
                description: req.body.description,
                link: req.body.link,
                imageType: req.body.imageType
            };

            if (req.file) {
                const baseUrl = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
                updateData.img = `http://localhost:${PORT}/uploads/${req.file.filename}`;
            }

            const updatedPost = await PostItem.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true }
            );

            if (!updatedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }

            res.status(200).json(updatedPost);
        } catch (error) {
            console.error('Update error:', error);
            res.status(500).json({ message: 'Server Error', error: error.message });
        }
    });
});

// Login route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        if (username === process.env.ADMIN_USERNAME && 
            password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { username: username },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            console.log('Login successful, token generated');
            res.json({ 
                token,
                message: 'Login successful'
            });
        } else {
            console.log('Invalid credentials attempt');
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Add this route to verify tokens
app.get('/api/verify-token', authenticateToken, (req, res) => {
    try {
        res.status(200).json({ 
            valid: true,
            user: req.user
        });
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(403).json({ 
            valid: false,
            message: 'Token verification failed',
            error: error.message
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
