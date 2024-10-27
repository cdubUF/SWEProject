import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
        <div className="login-container">
            <h1>Log into FitSync</h1>
            <div className='input-container'>
                <input type="text" placeholder="Username" className="login-input" value={username}
                onChange={(e) => setUsername(e.target.value)} />
            </div>
            
            <div className="password-container">
                <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    className="login-input" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <FontAwesomeIcon 
                    icon={showPassword ? faEyeSlash : faEye} 
                    className="eye-icon" 
                    onClick={togglePasswordVisibility} 
                />
            </div>
            
            <button onClick={handleLogin} className="login-button">Log In</button>
            {message && <p style={messageStyle}>{message}</p>}
            <p>
                Don't have an account? <a href="/signup">Sign Up!</a>
            </p>
        </div>
    );
}

export default LogIn;
