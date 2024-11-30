import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import Post from './Post';
import './Home.css'; // Make sure to create a corresponding CSS file for styling

import image1 from './images/airfriedpotatoes.jpg';
import image2 from './images/jumpingrope.png';
import image3 from './images/friedrice.jpg';
import image4 from './images/runningselfie.jpg';

function Home() {
    const { user, token } = useAuth();

    // Redirect to login if not authenticated
    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="home-container">
            <h1>Welcome, {user?.username}!</h1>
            <div className="ribbon">
                <Link to="/profile"><button className="ribbon-button">Profile</button></Link>
                <Link to="/createPost"><button className="ribbon-button">Create Post</button></Link>
            </div>
            <div className="posts-container">
                <Post description={"These are delicious!!!"} imageUrl={image1}/>
                <Post description={"Jumping rope is my new favorite workout. Burning so many claories!"} imageUrl={image2}/>
                <Post description={"Probably one of the best dishes I have made in a while. Only ~240 calories per serving too!"} imageUrl={image3}/>
                <Post description={"Today I just ran our local turkey trot 5k and made a new best time of 15:48!!!"} imageUrl={image4}/>
            </div>
        </div>
    );
};

export default Home;