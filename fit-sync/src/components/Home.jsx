import React from 'react';
// import './Home.css'; // Make sure to create a corresponding CSS file for styling

function Home() {
    return (
        <div className="home-container">
            <div className="ribbon">
                <button className="ribbon-button">Profile</button>
                <button className="ribbon-button">Create Post</button>
            </div>
            <div className="posts-container">
                {/* Example posts, replace with dynamic content as needed */}
                <div className="post">Post 1</div>
                <div className="post">Post 2</div>
                <div className="post">Post 3</div>
                {/* Add more posts here */}
            </div>
        </div>
    );
};

export default Home;