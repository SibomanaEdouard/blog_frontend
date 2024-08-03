import React from 'react';

const Post = ({ post }) => {
    return (
        <div className="border p-4 mb-4 rounded">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.content}</p>
            <p className="text-gray-500 text-sm">By {post.username}</p>
        </div>
    );
};

export default Post;
