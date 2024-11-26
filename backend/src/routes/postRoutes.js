const express = require("express");
const multer = require("../uploads/multer");
const Post = require("../models/Post");
const User = require("../models/User");

const router = express.Router();


// Create a Post
router.post("/", multer.single("file"), async (req, res) => {
  const { caption, userId } = req.body;
  const file = req.file;

  console.log("Request Body:", req.body); // Debugging
  console.log("File Info:", req.file); // Debugging

  if (!caption || !userId || !file) {
    return res.status(400).json({ message: "Caption, userId, and file are required." });
  }

  try {
    // Ensure the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new post
    const newPost = new Post({
      caption,
      file: file.filename,
      userId,
    });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully!", post: newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch Posts with Usernames
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "username"); // Fetch username from User
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch Posts by User ID
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await Post.find({ userId }).populate("userId", "username");
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
