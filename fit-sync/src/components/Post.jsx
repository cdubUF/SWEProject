import React from 'react';
import './Post.css'; 

function Post() {
    return (
        <div className="post">
            <img src="https://picsum.photos/400" alt="Post image" className="post-image" />
            <p className="post-description">Description here</p>
            <button className="like-button">Like</button>
            <button className="comment-button">Comment</button>
        </div>
    );
};

export default Post;