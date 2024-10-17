import React, { useState } from 'react';


// Progile page for user
// Will be filled with user information and posts
// Dependent on user data to display bio, profile picture, posts, and follower counts.

// To Do:
//     a button that say login, goals and miletonse, profile page


function Profile() {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <div className="profile-page">
            <div className="profile-header">
                
                <img src="https://picsum.photos/200" alt="Profile" className="profile-pic" />
                
                <h1 className="profile-name">User Name</h1>
                
                <p className="profile-bio">
                    This is a short bio about the user. 
                </p>

                <p className="follower-count">
                    {/* Follower Count */}
                    Insert Follower Count
                </p>

                <button onClick={handleFollowToggle} className="follow-btn">
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
                
                {/* Take User to message page */}
                <button className="message-btn">
                    Message
                </button>
            
            </div>

            <div className="profile-posts">
                {/* User's posts will go here */}
                Posts go here
            </div>

        </div>
    );
};

export default Profile;