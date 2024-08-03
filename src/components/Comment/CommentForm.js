import React, { useState, useContext } from 'react';
// import { AuthContext } from '../../contexts/AuthContext';
import { AuthContext } from '../../context/AuthContext';

const CommentForm = ({ postId, onSubmit }) => {
    const { user } = useContext(AuthContext);
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ content, author: user.username, postId });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg p-6">
            <textarea
                placeholder="Add a comment"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mb-4 p-2 border rounded w-full"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2
rounded">Submit</button>
</form>
);
};

export default CommentForm;