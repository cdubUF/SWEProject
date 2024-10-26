import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                // Store token and user data in context
                login(data.user, data.token);
                setMessage('Login successful!');
                console.log('Login successful:', data);
                navigate('/home');
            } else {
                setMessage(data.message || 'Invalid username or password');
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            setMessage('Error during login. Please try again.');
            console.error('Error during login:', error);
        }
    };

    const messageStyle = {
        padding: '10px',
        marginTop: '10px',
        color: message.includes('successful') ? 'green' : 'red'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h1>Log into FitSync</h1>
            <input 
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ margin: '10px 0', padding: '10px', width: '200px' }} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ margin: '10px 0', padding: '10px', width: '200px' }} 
            />
            <button 
                onClick={handleLogin}
                style={{ marginTop: '20px', padding: '10px 20px' }}
            >
                Log In
            </button>
            {message && <p style={messageStyle}>{message}</p>}
            <p style={{ marginTop: '20px' }}>
                Don't have an account? <a href="/signup">Sign Up!</a>
            </p>
        </div>
    );
};

export default LogIn;