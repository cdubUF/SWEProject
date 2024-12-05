import React from 'react';
import './Post.css'; 

function Post({ description, imageUrl }) {
    return (
        <div className="post">
            <img src={imageUrl} alt="" className="post-image" />
            <p className="post-description">{description}</p>
            <button className="like-button">Like</button>
            <button className="comment-button">Comment</button>
        </div>
    );
};

export default Post;