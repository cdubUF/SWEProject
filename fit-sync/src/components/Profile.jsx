import React, { useState, useEffect } from 'react';
import './Profile.css';
import './GoalComp.jsx';
import GoalComp from './GoalComp.jsx';

// Profile page for user
// Displays user information, goals, posts, and follower count
// Data for name, bio, profile picture, and follower count are fetched from a database

function Profile() {
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);
    const [userData, setUserData] = useState({
        name: 'Insert name here',
        bio: 'Insert bio here',
        profileImg: 'https://picsum.photos/200',
    });
    const [goals, setGoals] = useState([]);
    const [posts, setPosts] = useState([]);

    
    useEffect(() => {
        const fetchUserData = async () => {
            setUserData({
                name: 'Jane Doe',
                bio: 'Gym Brodie, I bench 285',
                profileImg: 'https://picsum.photos/200', // Replace with actual or mongo db stuff
            });
            setFollowerCount(150); // follower count for now
            
            setGoals([
                { id: 1, text: 'Complete React project' },
                { id: 2, text: 'Reach 200 followers' } 
            ]);

            
            setPosts([
                { id: 1, content: 'My first post!' },
                { id: 2, content: 'Another exciting update!' }
            ]);
        };

        fetchUserData();
    }, []);

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing);
        setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1);
    };

    return (
        <div className="profile-page">
            <div className="profile-header">
                <img src={userData.profileImg} alt="Profile" className="profile-pic" />
                <h1 className="profile-name">{userData.name}</h1>
                <p className="profile-bio">{userData.bio}</p>
                <p className="follower-count">Followers: {followerCount}</p>

                <button onClick={handleFollowToggle} className="follow-btn">
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
                
                <button className="message-btn">Message</button>
                <button className="goals-btn">Create Goals</button>
            </div>

            <div className="profile-goals">
                <h2>Goals</h2>
                <div className="goal-container">
                {goals.length > 0 ? <GoalComp /> : <p>No goals set yet.</p>}  
                </div>
            </div>

            <div className="profile-posts">
                <h2>Posts</h2>
                <ul>
                    {posts.length > 0 ? (
                        posts.map(post => <li key={post.id}>{post.content}</li>)
                    ) : (
                        <p>No posts yet.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Profile;
