import React, { useState } from 'react';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        // Handle sign up logic here
        // For now, just log the username and password to the console
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div>
            <h1>Create FitSync account</h1>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};

export default SignUp;