const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Item = require('./models/Item');

const app = express();

// Custom Middleware for POST requests (10 Points)
app.use((req, res, next) => {
    if (req.method === 'POST') {
        console.log(`[${new Date().toISOString()}] POST request by User ID: ${req.session.userId || 'Guest'}`);
    }
    next();
});

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Session Setup
const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'mySessions'
});

app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false,
    store: store
}));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB Atlas successfully"))
    .catch(err => console.error("Database error:", err));

// --- AUTH ROUTES ---
app.post('/api/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = new User({ username: req.body.username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Registration failed" });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        req.session.userId = user._id;
        res.json({ message: "Login successful", userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Login error" });
    }
});

 app.delete('/api/items/:id', async (req, res) => {
    try {
        const item = await Item.findOneAndDelete({ _id: req.params.id, owner: req.session.userId });
        if (!item) return res.status(403).json({ message: "Access denied or item not found" });
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete error" });
    }
});

app.listen(5000, () => console.log('Server is running on port 5000'));