import React, { useState } from 'react';

interface ForumPost {
    id: number;
    title: string;
    content: string;
    author: string;
}

const Forum: React.FC = () => {
    const [posts, setPosts] = useState<ForumPost[]>([
        { id: 1, title: "AI Ethics Discussion", content: "What are the ethical implications of AI?", author: "User1" },
        { id: 2, title: "Future of AI", content: "Where do you see AI in 10 years?", author: "User2" }
    ]);

    return (
        <div>
            <h2>Forum</h2>
            {posts.map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p>By: {post.author}</p>
                    <hr />
                </div>
            ))}
            {/* Add a form to create new posts here */}
        </div>
    );
};

export default Forum;
