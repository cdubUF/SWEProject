const express = require('express');
const multer = require('../uploads/multer');
const { Post } = require('../models/Post');
const User = require('../models/User');

const router = express.Router();

const path = require('path');
const app = express();

// Serve the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create a Post
router.post('/', multer.single('file'), async (req, res) => {
  const { caption, userId } = req.body;
  const file = req.file;

  console.log('Request Body:', req.body); // Debugging
  console.log('File Info:', req.file); // Debugging

  if (!caption || !userId || !file) {
    return res.status(400).json({ message: 'Caption, userId, and file are required.' });
  }

  try {
    // Ensure the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new post
    const newPost = new Post({
      caption,
      file: file.filename,
      user: userId,
    });
    await newPost.save();

    await newPost.populate('user', 'username');

    res.status(201).json({
      message: 'Post created successfully!',
      post: newPost
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch Feed (all posts sorted by date)
router.get('/feed', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('user', 'username')
      .populate('comments.user', 'username')
      .limit(10);
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch Posts by User ID
router.get('/user/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('user', 'username')
      .populate('comments.user', 'username');
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:postId/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userId = req.body.userId;
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // Unlike the post
      post.likes.pull(userId);
      post.likesCount--;
    } else {
      // Like the post
      post.likes.push(userId);
      post.likesCount++;
    }

    await post.save();
    res.json({ message: isLiked ? 'Post unliked' : 'Post liked', post });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a comment to a post
router.post('/:postId/comment', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const { userId, content } = req.body;
    post.comments.push({
      content,
      user: userId,
    });
    post.commentsCount++;

    await post.save();
    await post.populate('comments.user', 'username');
    
    res.json({
      message: 'Comment added successfully!',
      comment: post.comments[post.comments.length - 1]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a comment from a post
router.delete('/:postId', async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.postId,
      user: req.body.userId
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch Posts for a specific User ID (My Posts)
router.get('/my-posts/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch posts from the database associated with the user
    const userPosts = await Post.find({ user: userId })
      .sort({ createdAt: -1 }) // Sort by most recent
      .populate('user', 'username') // Populate user details
      .populate({
        path: 'comments.user', // Populate user details within comments
        select: 'username', // Include only username in the comments
      });

    // Send the posts back to the frontend directly
    res.status(200).json({ posts: userPosts });
  } catch (error) {
    console.error('Error fetching user posts:', error.message);
    res.status(500).json({ message: 'Failed to fetch posts for the user.' });
  }
});



module.exports = router;
