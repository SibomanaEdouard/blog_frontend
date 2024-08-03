import React, { useState, useEffect } from 'react';
import PostList from '../components/Blog/PostList';
import axiosInstance from '../context/axiosConfig';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosInstance.get('/posts/all-posts');
                if (response.data.data.length === 0) {
                    setError('No posts found.');
                } else {
                    setPosts(response.data.data);
                }
            } catch (err) {
                setError('Error fetching posts.');
                console.error('Error fetching posts:', err);
            }
            setLoading(false);
        };

        fetchPosts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500 font-semibold">{error}</p>}
            {!loading && !error && posts.length === 0 && (
                <p className="text-gray-500">No posts available.</p>
            )}
            {!loading && !error && posts.length > 0 && <PostList posts={posts} />}
        </div>
    );
};

export default Home;
