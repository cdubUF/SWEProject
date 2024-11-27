const express = require('express');
const router = express.Router();
const User = require('../models/User');

// CREATE - POST /api/users/:id/goals
router.post('/:id/goals', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Debugging date parsing in console
        const dueDate = new Date(req.body.dueDate);
        console.log('Input date:', req.body.dueDate);
        console.log('Parsed date:', dueDate);
        console.log('Today:', new Date());

        // Validate due date
        if (isNaN(dueDate)) {
            return res.status(400).json({ 
                message: 'Invalid date format. Please use YYYY-MM-DD' 
            });
        }

        // Validate due date is not in the past
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        dueDate.setHours(0, 0, 0, 0);

        if (dueDate < today) {
            return res.status(400).json({ 
                message: 'Goal date cannot be in the past!' 
            });
        }

        const newGoal = {
            title: req.body.title,
            description: req.body.description,
            dueDate: dueDate,
        };

        // Validate title
        if (!req.body.title || req.body.title.trim().length === 0) {
            return res.status(400).json({ message: 'Title is required!' });
        }

        user.goals.push(newGoal);
        await user.save();

        res.status(201).json({
            message: 'Goal added successfully!',
            goal: newGoal
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                message: 'Validation failed',
                errors: messages 
            });
        }

        console.error('Error adding goal:', error);
        res.status(500).json({ message: error.message });
    }
});

// READ ALL - GET /api/users/:id/goals
router.get('/:id/goals', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.goals);
    }   catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ ONE - GET /api/users/:id/goals/:goalId
router.get('/:id/goals/:goalId', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const goal = user.goals.id(req.params.goalId);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.json(goal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE - PUT /api/users/:id/goals/:goalId
router.put('/:id/goals/:goalId', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const goal = user.goals.id(req.params.goalId);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        // Validate due date
        if (req.body.dueDate) {
            const dueDate = new Date(req.body.dueDate);
            if (isNaN(dueDate)) {
                return res.status(400).json({ 
                    message: 'Invalid date format. Please use YYYY-MM-DD' 
                });
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            dueDate.setHours(0, 0, 0, 0);

            if (dueDate < today) {
                return res.status(400).json({ 
                    message: 'Goal date cannot be in the past!' 
                });
            }

            goal.dueDate = dueDate;
        }

        // Update goal properties
        if (req.body.title) {
            goal.title = req.body.title;
        }

        if (req.body.description) {
            goal.description = req.body.description;
        }

        if (req.body.dueDate) {
            goal.dueDate = req.body.dueDate;
        }

        await user.save();
        res.json({
            message: 'Goal updated successfully!',
            goal: goal
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE - DELETE /api/users/:id/goals/:goalId
router.delete('/:id/goals/:goalId', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const goalIndex = user.goals.findIndex(
            goal => goal._id.toString() === req.params.goalId
        );

        if (goalIndex === -1) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        user.goals.splice(goalIndex, 1);
        await user.save();

        res.json({ message: 'Goal deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
