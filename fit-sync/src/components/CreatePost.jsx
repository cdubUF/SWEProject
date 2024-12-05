import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate , Navigate} from 'react-router-dom';
import './CreatePost.css';

function CreatePost() { // Accept userId as a prop

    const { user } = useAuth();
    const userId = user.id;

    const [caption, setCaption] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const validTypes = ['application/pdf', 'image/png', 'image/jpeg'];
            if (validTypes.includes(selectedFile.type)) {
                setFile(selectedFile);
                setMessage('');
            } else {
                setMessage('Invalid file type. Please upload a PNG file.');
                setFile(null);
            }
        }
    };

    const handleSubmit = async () => {
            console.log("User ID being sent:", userId);

        if (!userId) {
            setMessage("User ID is missing. Please log in again.");
            return;
        }
        if (!caption || !file) {
            setMessage('Please provide both a caption and a file.');
            return;
        }

        const formData = new FormData();
        formData.append('caption', caption);
        formData.append('file', file);
        formData.append('userId', userId); // Include userId in the request

        try {
            const response = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setMessage('Post created successfully!');
                setCaption('');
                setFile(null);
                setTimeout(() => navigate('/profile'), 1500);
            } else {
                const data = await response.json();
                setMessage(data.message || 'Failed to create post.');
            }
        } catch (error) {
            setMessage('Error creating post. Please try again.');
        }
    };

    const messageStyle = {
        padding: '10px',
        marginTop: '10px',
        color: message.includes('successfully') ? 'green' : 'red',
    };

    return (
        <div className="create-post-container">
            <h1>Create a Post</h1>
            <div className="input-container">
                <textarea
                    placeholder="Enter your caption..."
                    className="caption-input"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                />
            </div>
            <div className="file-upload-container">
                <input
                    type="file"
                    accept=".png"
                    onChange={handleFileChange}
                />
            </div>
            <button onClick={handleSubmit} className="submit-button">Submit</button>
            {message && <p style={messageStyle}>{message}</p>}
        </div>
    );
}

export default CreatePost;
