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
    const [posts, setPosts] = useState([]); // Added state for posts
    const [showPosts, setShowPosts] = useState(false); // Added state to control visibility
    const [loadingPosts, setLoadingPosts] = useState(false); // Added state for loading
    const [postError, setPostError] = useState(null); // Added state for errors

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
                
                // Fetch posts from database (removed hardcoded data)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [user]);

    // Function to fetch posts from backend
    const fetchUserPosts = async () => {
        if (!user || !user.id) return;

        try {
            setLoadingPosts(true);
            setPostError(null); // Reset error state
            const response = await fetch(`http://localhost:5000/api/posts/my-posts/${user.id}`);
            if (!response.ok) throw new Error('Failed to fetch posts.');
            const postData = await response.json();
            setPosts(postData.posts);
        } catch (error) {
            console.error('Error fetching user posts:', error);
            setPostError('Failed to load posts. Please try again later.');
        } finally {
            setLoadingPosts(false);
        }
    };

    // Function to handle the "My Posts" button
    const handleShowPosts = () => {
        setShowPosts(!showPosts); // Toggle visibility
        if (!showPosts && posts.length === 0) {
            fetchUserPosts(); // Fetch posts if not already fetched
        }
    };

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
            
                <Link to="/createPost"><button className="posts-btn">Create Post</button></Link>
                <Link to="/profile/creategoal"><button className="goals-btn">Create Goals</button></Link>

                {/* My Posts button */}
                <button onClick={handleShowPosts} className="my-posts-btn">
                    {showPosts ? 'Hide My Posts' : 'Show My Posts'}
                </button>
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

            {/* Posts section */}
            {showPosts && (
                <div className="profile-posts">
                    {/* <h2>My Posts</h2> */}
                    {loadingPosts ? (
                        <p>Loading posts...</p>
                    ) : postError ? (
                        <p>{postError}</p>
                    ) : posts.length > 0 ? (
                        <ul>
                            {posts.map((post) => (
                                <li key={post._id}>
                                    <p>{post.caption}</p>
                                    <img src={`http://localhost:5000/uploads/${post.file}`} 
                                         alt={post.caption}
                                         style={{
                                            maxWidth: '100%',
                                            height: '240px',
                                            width: '240px',
                                            display: 'block',
                                            margin: '10px auto',
                                            borderRadius: '5px',
                                            }}/>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No posts yet.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Profile;
