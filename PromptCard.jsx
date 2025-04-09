import React, { useState } from 'react';

const PromptCard = ({ prompt }) => {
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleRating = (newRating) => {
        setRating(newRating);
    };

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '300px' }}>
            <h3>{prompt.title}</h3>
            <p>{prompt.description}</p>

            <h4>Before</h4>
            {prompt.beforeImage && <img src={prompt.beforeImage} alt="Before" style={{ maxWidth: '100%' }} loading="lazy" />}
            <p>{prompt.beforeText}</p>

            <h4>After</h4>
            {prompt.afterImage && <img src={prompt.afterImage} alt="After" style={{ maxWidth: '100%' }} loading="lazy" />}
            <p>{prompt.afterText}</p>

            <div>
                <button>Remix</button>
            </div>

            <div>
                <button onClick={() => handleRating(1)}>Funny</button>
                <button onClick={() => handleRating(2)}>Insightful</button>
                <button onClick={() => handleRating(3)}>WTF</button>
                <p>Rating: {rating}</p>
            </div>

            <div>
                <h4>Comments</h4>
                {comments.map((comment, index) => (
                    <p key={index}>{comment}</p>
                ))}
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
        </div>
    );
};

export default PromptCard;
