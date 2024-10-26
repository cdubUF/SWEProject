const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken } = require('../config/jwt');

// CREATE - POST /api/users
router.post('/', async (req, res) => {
    try {
        console.log('Received signup request:', req.body);
        const user = await User.create(req.body);
        console.log('User created successfully:', user);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });

        // If user doesn't exist
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Use comparePassword method to check if password matches
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate token
        const token = generateToken(user._id);

        // Login successful
        res.json({ 
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// READ ALL - GET /api/users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ ONE - GET /api/users/:id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE - PUT /api/users/:id
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id, 
            req.body,
            { new: true }
        );
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE - DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;