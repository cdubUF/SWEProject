const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, 'Title must be at least 3 characters long!'],
            maxlength: [50, 'Title can be at most 50 characters long!'],
        },
        description: {
            type: String,
            trim: true,
            minlength: [10, 'Description must be at least 10 characters long!'],
            maxlength: [200, 'Description can be at most 200 characters long!'],
        },
        dueDate: {
            type: Date,
            required: true,
        },
        dateAdded: {
            type: Date,
            default: Date.now,
        }
    }
);

// Export both goal schema and model in case we want to include goal sharing and discoverability in the future
module.exports = { 
    goalSchema,
    Goal: mongoose.model('Goal', goalSchema)
};
