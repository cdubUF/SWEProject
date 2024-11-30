import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useAuth } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import GoalComp from './GoalComp.jsx';

// Profile page for user
// Displays user information, goals, posts, and follower count
// Data for name, bio, profile picture, and follower count are fetched from a database

function Profile() {
    const { user, token } = useAuth();
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
            if (!user || !user.id) return;

            try {
                const goalsResponse = await fetch(`http://localhost:5000/api/users/${user.id}/goals`);
                if (goalsResponse.ok) {
                    const goalsData = await goalsResponse.json();
                    setGoals(goalsData);
                }

                // Fetch user data from database
                setUserData({
                    name: user.username,
                    bio: 'Gym Brodie, I bench 285',
                    profileImg: 'https://picsum.photos/200', // Replace with actual or mongo db stuff
                });
                setFollowerCount(150); // follower count for now
                
                // Fetch posts from database
                setPosts([
                    { id: 1, content: 'My first post!' },
                    { id: 2, content: 'Another exciting update!' }
                ]);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [user]);

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing);
        setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1);
    };

    // Redirect to login if not authenticated
    if (!token) {
        return <Navigate to="/login" />;
    }

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
                <Link to="/profile/creategoal"><button className="goals-btn">Create Goals</button></Link>
                
            </div>

            <div className="profile-goals">
                <h2>Goals</h2>
                <div className="goal-container">
                    {goals.length > 0 ? (
                        goals.map(goal => (
                            <GoalComp key={goal.id} title={goal.title} description={goal.description} dueDate={goal.dueDate} />
                        ))
                    ) : (
                        <p>No goals yet.</p>
                    )}
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
