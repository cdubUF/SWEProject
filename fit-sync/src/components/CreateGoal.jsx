import React, { useState } from 'react';
import { useNavigate , Navigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CreateGoal.css';

const CreateGoal = () => {
    const { user, token } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:5000/api/users/${user.id}/goals`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    dueDate,
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Goal created successfully!');
                setTitle('');
                setDescription('');
                setDueDate('');
                setTimeout(() => navigate('/profile'), 1500);
            } else {
                setMessage(data.message || data.errors?.join(', ') || 'Failed to create goal.');
            }
        } catch (error) {
            setMessage('Error creating goal. Please try again.');
            console.error('Error creating goal:', error);
        }
    };

    const validateForm = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(dueDate);
        return (
            title.length > 3 &&
            title.length < 50 &&
            description.length > 10 &&
            description.length < 200 &&
            selectedDate > today
        );
    };

    // Redirect to login if not authenticated
    if (!token) {
        return <Navigate to="/login" />;
    }

    const messageStyle = {
        padding: '10px',
        marginTop: '10px',
        color: message.includes('successfully') ? 'green' : 'red'
    };

    // Get tomorrow's date for min attribute in date input
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

    return (
        <div>
            <h2>Create a New Goal</h2>
            <form onSubmit={handleSubmit}>
                <div className='title'>
                    <label>Title:</label>
                    <input
                        className='title-input'
                        type="text"
                        placeholder='Enter a title (3-50 characters)'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        minLength="3"
                        maxLength="50"
                        required
                    />
                    {title && (title.length < 3 || title.length > 50) && (
                        <span className="validation-message">
                            Title must be between 3 and 50 characters!
                        </span>
                    )}
                </div>
                <div className='description'>
                    <label>Description:</label>
                    <input
                        className='description-input'
                        placeholder='Enter a description (10-200 characters)'
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        minLength="10"
                        maxLength="200"
                        required
                    />
                    {description && (description.length < 10 || description.length > 200) && (
                        <span className="validation-message">
                            Description must be between 10 and 200 characters!
                        </span>
                    )}
                </div>
                <div className='date'>
                    <label>Target Date:</label>
                    <input
                        className='date-input'
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        min={tomorrowFormatted}
                        required
                    />
                    {dueDate && (
                        <span className="validation-message">
                            {(() => {
                                const selectedDate = new Date(dueDate);
                                selectedDate.setHours(24, 0, 0, 0);
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                
                                if (selectedDate < today) {
                                    return "Due date cannot be in the past!";
                                } else if (selectedDate.toDateString() === today.toDateString()) {
                                    return "Due date cannot be today!";
                                }
                                return "";
                            })()}
                        </span>
                    )}
                </div>
                <button 
                    type="submit" 
                    disabled={!validateForm()}
                >
                    Create Goal
                </button>
            </form>
            {message && <p style={messageStyle}>{message}</p>}
        </div>
    );
};

export default CreateGoal;