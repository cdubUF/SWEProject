require('dotenv').config();
console.log('MongoDB URL:', process.env.MONGODB_URL);
const express = require('express');
const connectDB = require('./src/config/db');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const postRoutes = require('./src/routes/postRoutes');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use("/api/posts", postRoutes);

app.use("/uploads", express.static("./src/uploads"));


// Basic route for testing
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend server is running!' });
});

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});