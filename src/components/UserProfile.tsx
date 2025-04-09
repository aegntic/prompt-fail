import React from 'react';

interface UserProfileProps {
    userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
    // Placeholder data - replace with actual data fetching
    const userData = {
        username: "User" + userId,
        promptsSubmitted: 15,
        commentsMade: 32,
        forumPosts: 5
    };

    return (
        <div>
            <h2>{userData.username}</h2>
            <p>Prompts Submitted: {userData.promptsSubmitted}</p>
            <p>Comments Made: {userData.commentsMade}</p>
            <p>Forum Posts: {userData.forumPosts}</p>
            {/* Add more user activity details here */}
        </div>
    );
};

export default UserProfile;
