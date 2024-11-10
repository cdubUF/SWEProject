import React, { useState, useEffect } from 'react';
import './Profile.css';


// Progile page for user
// Will be filled with user information and posts
// Dependent on user data to display bio, profile picture, posts, and follower counts.

// To Do:
//     a button that say login, goals and miletonse, profile page


function Profile() {
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);

    // Use useeffect to fetch name, follower count, image, and bio from database

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <div className="profile-page">
            <div className="profile-header">

                {/* Insert image url */}
                <img src="https://picsum.photos/200" alt="Profile" className="profile-pic" />

                <h1 className="profile-name">
                    {"Insert name here"}
                </h1>
                
                <p className="profile-bio">
                    {"Insert bio here"} 
                </p>

                <p className="follower-count">
                    Followers: {followerCount}
                </p>

                <button onClick={handleFollowToggle} className="follow-btn">
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
                
                {/* Take User to message page */}
                <button className="message-btn">
                    Message
                </button>
                <button className='goals-btn'>
                    Create Goals
                </button>
            </div>

            <div className="profile-goals">
                <h1>Goals</h1>
            </div>

            <div className="profile-posts">
                <h1>Posts</h1>
            </div>
        </div>
    );
};

export default Profile;