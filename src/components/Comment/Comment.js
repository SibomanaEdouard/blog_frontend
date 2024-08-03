import React from 'react';

const Comment = ({ comment }) => {
    return (
        <div className="border p-2 mb-2 rounded">
            <p>{comment.content}</p>
            <p className="text-gray-500 text-sm">By {comment.author}</p>
        </div>
    );
};

export default Comment;
