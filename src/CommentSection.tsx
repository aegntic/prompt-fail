import React, { useState, useEffect } from 'react';

interface Comment {
  id: number;
  text: string;
  author: string;
}

interface CommentSectionProps {
  postId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/comments?postId=${postId}`);
      const data = await response.json();
      setComments(data);
    };

    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    const comment = {
      id: Math.random(),
      text: newComment,
      author: 'Anonymous',
    };

    setComments([...comments, comment]);
    setNewComment('');

    // Optimistically add comment, in real app you would POST to the server
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <p>{comment.text}</p>
          <p>By: {comment.author}</p>
        </div>
      ))}
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
