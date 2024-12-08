// server.js
import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db.js';
import PostItem from './models/postItem.js';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: ['https://syncubator.in', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to MySQL
connectDB();

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store in memory temporarily
const upload = multer({ storage: storage });

// Authentication middleware
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
app.put('/api/updateItem/:id', authenticateToken, upload.single('image'), async (req, res) => {
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

// Then use PORT from environment variables with a fallback
const PORT = process.env.PORT || 10000;

// Update the listen call to log the actual port being used
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Database Host:', process.env.DB_HOST);
});
