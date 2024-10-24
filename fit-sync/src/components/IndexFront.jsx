import React from 'react';
import { Link } from 'react-router-dom';

function IndexFront() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to FitSync</h1>
            <p>Your ultimate fitness companion</p>
            <Link to="/login">
                <button style={{ display: 'block', margin: '20px auto' }}>Log In</button>
            </Link>
            <p>Don't have an account? Sign Up!</p>
            <Link to="/signup">
                <button style={{ display: 'block', margin: '20px auto' }}>Sign Up</button>
            </Link>
        </div>
    );
};

export default IndexFront;