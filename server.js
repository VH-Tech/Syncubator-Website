// server.js
import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db.js';
import PostItem from './models/postItem.js';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 3306;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

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
app.post('/api/postItems', authenticateToken, async (req, res) => {
    try {
        const { img, title, description, link, imageType } = req.body;

        if (!img || !title || !description || !link) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newPost = await PostItem.create({ 
            img, 
            title, 
            description, 
            link, 
            imageType: imageType || 'cover' 
        });
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error in POST /api/postItems:', error.message);
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
app.put('/api/updateItem/:id', authenticateToken, async (req, res) => {
    try {
        const { img, title, description, link, imageType } = req.body;
        const [updated] = await PostItem.update(
            { img, title, description, link, imageType },
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
