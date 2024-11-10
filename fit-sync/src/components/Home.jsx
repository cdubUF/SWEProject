import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
// import './Home.css'; // Make sure to create a corresponding CSS file for styling

function Home() {
    const { user, token } = useAuth();

    // Redirect to login if not authenticated
    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="home-container">
            <h1>Welcome, {user?.username}!</h1>
            <div className="ribbon">
                <Link to="/profile"><button className="ribbon-button">Profile</button></Link>
                
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