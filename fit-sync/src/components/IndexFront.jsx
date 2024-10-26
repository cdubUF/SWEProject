import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/fitsync-logo.jpg'; // Adjust the path if necessary

function IndexFront() {
    return (
        <div className="index-container">
            <h1>Welcome to FitSync</h1>
            <p>Track your workouts, monitor your progress,
                and stay motivated with personalized plans 
                designed to help you reach your fitness goals.
                Join a community of fitness enthusiasts and access expert tips, 
                all in one seamless platform.
            </p>

            <Link to="/login">
                <button className="index-button">Log In</button>
            </Link>
            <p>Don't have an account? Sign Up!</p>
            <Link to="/signup">
                <button className="index-button">Sign Up</button>
            </Link>
        </div>
    );
}

export default IndexFront;
