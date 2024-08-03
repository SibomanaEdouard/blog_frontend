import React from 'react';
import PostForm from '../components/Blog/PostForm';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../context/axiosConfig';

const NewPost = () => {
    const navigate = useNavigate();

    const addPost = async (post) => {
        await axiosInstance.post('/posts', post);
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">New Post</h1>
                <PostForm onSubmit={addPost} />
            </div>
        </div>
    );
};

export default NewPost;
