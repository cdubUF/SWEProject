import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../index.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [message, setMessage] = useState('');
    
    const handleSignUp = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users', {
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
                setMessage('Sign up successful!');
                console.log('Sign up successful:', data);
            } else {
                if (data.message.includes('duplicate key error')) {
                    setMessage(`Username "${username}" already exists! Please choose another username.`);
                } else {
                    setMessage('Sign up failed. Please try again.');
                }
                console.error('Sign up failed:', data.message);
            }
        } catch (error) {
            setMessage('Error during sign up: ' + error.message);
            console.error('Error during sign up:', error);
        }
    };

    const messageStyle = {
        padding: '10px',
        marginTop: '10px',
        color: message.includes('successful') ? 'green' : 'red'
    };

    return (
        <div className="signup-container">
            <h1>Create FitSync account</h1>
            {message && <p style={messageStyle}>{message}</p>}
            <div className='input-container'>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="signup-input"
                />
            </div>
            
            <div className="password-container">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="signup-input"
                />
                <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="eye-icon"
                    onClick={togglePasswordVisibility}
                />
            </div>
            
            <button className="signup-button" onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};

export default SignUp;
