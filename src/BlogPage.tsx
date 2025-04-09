import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost';
import Pagination from './Pagination';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  publicationDate: string;
}

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/posts?page=${currentPage}&limit=${postsPerPage}`);
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, [currentPage, postsPerPage]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Blog</h1>
      {currentPosts.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default BlogPage;
