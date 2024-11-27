const mongoose = require("mongoose");

// Comment schema
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Post schema
const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    file: {
      type: String, // Store file path or name
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference the User schema
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference the User schema
      },
    ],
    comments: [commentSchema], // Embed comment array
    likesCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Add indexes to improve query performance
postSchema.index({ user: 1, createdAt: -1 });
postSchema.index({ createdAt: -1 });

// Export both post schema and model for aggregation in feed
module.exports = {
  postSchema,
  Post: mongoose.model("Post", postSchema),
}
