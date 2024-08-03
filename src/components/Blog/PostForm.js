import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const PostForm = ({ onSubmit }) => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, content, author: user });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-4 p-3 border rounded w-full"
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mb-4 p-3 border rounded w-full h-40"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded">Submit</button>
        </form>
    );
};

export default PostForm;
