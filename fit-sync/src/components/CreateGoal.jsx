import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CreateGoal.css';

const CreateGoal = () => {
    const { token } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newGoal = {
            title,
            description,
            targetDate,
        };
        console.log('Goal Created:', newGoal);
        // Add logic to save the goal
        setTitle('');
        setDescription('');
        setTargetDate('');
    };

    // Redirect to login if not authenticated
    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h2>Create a New Goal</h2>
            <form onSubmit={handleSubmit}>
                <div className='title'>
                    <label>Title:</label>
                    <input
                        className='title-input'
                        type="text"
                        placeholder='Enter a title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className='description'>
                    <label>Description:</label>
                    <input
                        className='description-input'
                        placeholder='Enter a description'
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className='date'>
                    <label>Target Date:</label>
                    <input
                        className='date-input'
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        required
                    />
                </div>
                <Link to="/profile"><button type="submit">Create Goal</button></Link>
            </form>
        </div>
    );
};

export default CreateGoal;