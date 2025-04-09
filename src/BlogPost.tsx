import React from 'react';
import CommentSection from './CommentSection';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  publicationDate: string;
}

interface BlogPostProps {
  post: Post;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <div className="blog-post">
      <h2>{post.title}</h2>
      <img src={post.featuredImage} alt={post.title} />
      <p>{post.excerpt}</p>
      <p>Author: {post.author}</p>
      <p>Published: {post.publicationDate}</p>
      <CommentSection postId={post.id} />
    </div>
  );
};

export default BlogPost;
