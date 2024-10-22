import React from 'react';

function LogIn() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h1>Log into FitSync</h1>
            <input type="text" placeholder="Username" style={{ margin: '10px 0', padding: '10px', width: '200px' }} />
            <input type="password" placeholder="Password" style={{ margin: '10px 0', padding: '10px', width: '200px' }} />
            <button style={{ marginTop: '20px', padding: '10px 20px' }}>Log In</button>
            <p style={{ marginTop: '20px' }}>
                Don't have an account? <a href="/signup">Sign Up!</a>
            </p>
        </div>
    );
};

export default LogIn;