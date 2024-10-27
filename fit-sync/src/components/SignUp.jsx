import React, { useState } from 'react';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
        <div>
            <h1>Create FitSync account</h1>
            {message && <p style={messageStyle}>{message}</p>}
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ margin: '10px 0', padding: '10px', width: '200px' }}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ margin: '10px 0', padding: '10px', width: '200px' }}
                />
            </div>
            <button style={{ marginTop: '20px', padding: '10px 20px' }} onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};

export default SignUp;