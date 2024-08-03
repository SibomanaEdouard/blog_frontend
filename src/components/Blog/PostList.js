import React, { useState, useCallback } from 'react';
import axiosInstance from '../../context/axiosConfig';
import { useAuth } from '../../context/AuthContext';

const PostList = ({ posts }) => {
    const { currentUser } = useAuth();
    const [expandedPostId, setExpandedPostId] = useState(null);
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentContent, setEditCommentContent] = useState('');
    const [editPostId, setEditPostId] = useState(null);
    const [editPostContent, setEditPostContent] = useState('');
    const [postList, setPostList] = useState(posts);

    const handleExpand = useCallback(async (postId) => {
        if (expandedPostId === postId) {
            setExpandedPostId(null);
            return;
        }

        try {
            const response = await axiosInstance.get(`/comment/${postId}`);
            setComments(prevComments => ({
                ...prevComments,
                [postId]: response.data.data || []
            }));
            setExpandedPostId(postId);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }, [expandedPostId]);

    const handleAddComment = async (postId) => {
        if (!currentUser) return;
        try {
            const response = await axiosInstance.post(`/comment/${postId}`, { content: newComment });
            setComments(prevComments => ({
                ...prevComments,
                [postId]: [...(prevComments[postId] || []), response.data.data]
            }));
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleEditComment = async (postId, commentId) => {
        try {
            const response = await axiosInstance.put(`/comment/${commentId}`, { content: editCommentContent });
            setComments(prevComments => ({
                ...prevComments,
                [postId]: prevComments[postId].map(comment =>
                    comment.id === commentId ? response.data.data : comment
                )
            }));
            setEditCommentId(null);
            setEditCommentContent('');
        } catch (error) {
            console.error('Error editing comment:', error);
        }
    };

    const handleEditPost = async (postId) => {
        try {
            const response = await axiosInstance.put(`/posts/${postId}`, { content: editPostContent });
            setPostList(prevPosts => prevPosts.map(post =>
                post.id === postId ? { ...post, content: editPostContent } : post
            ));
            setEditPostId(null);
            setEditPostContent('');
        } catch (error) {
            console.error('Error editing post:', error);
        }
    };

    const handleDeleteComment = async (postId, commentId) => {
        try {
            await axiosInstance.delete(`/comment/${commentId}`);
            setComments(prevComments => ({
                ...prevComments,
                [postId]: prevComments[postId].filter(comment => comment.id !== commentId)
            }));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await axiosInstance.delete(`/posts/${postId}`);
            setPostList(prevPosts => prevPosts.filter(post => post.id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {postList.map((post) => (
                    <div
                        key={post.id}
                        className={`bg-white border rounded-lg shadow-lg p-4 transition-transform duration-300 ease-in-out transform ${expandedPostId === post.id ? 'border-blue-500 scale-105' : 'border-gray-200'}`}
                    >
                        {editPostId === post.id ? (
                            <>
                                <textarea
                                    value={editPostContent}
                                    onChange={(e) => setEditPostContent(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                                <button
                                    onClick={() => handleEditPost(post.id)}
                                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => setEditPostId(null)}
                                    className="mt-2 px-4 py-2 bg-gray-500 text-white rounded"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
                                <p className="text-gray-700 mt-2">
                                    {post.content.substring(0, 100)}
                                    {post.content.length > 100 && '...'}
                                </p>
                                <p className="text-gray-600 mt-2">By {post.username}</p>
                                {currentUser && currentUser.id === post.authorId && (
                                    <>
                                        <button
                                            onClick={() => {
                                                setEditPostId(post.id);
                                                setEditPostContent(post.content);
                                            }}
                                            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded"
                                        >
                                            Edit Post
                                        </button>
                                        <button
                                            onClick={() => handleDeletePost(post.id)}
                                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                                        >
                                            Delete Post
                                        </button>
                                    </>
                                )}
                            </>
                        )}

                        <button
                            onClick={() => handleExpand(post.id)}
                            className={`mt-4 px-4 py-2 rounded font-semibold ${expandedPostId === post.id ? 'bg-red-500' : 'bg-blue-500'} text-white transition-colors duration-300`}
                        >
                            {expandedPostId === post.id ? 'HIDE COMMENTS' : 'SHOW COMMENTS'}
                        </button>

                        {expandedPostId === post.id && (
                            <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <h4 className="text-lg font-semibold text-gray-800">Comments:</h4>
                                <div className="mt-2 space-y-2">
                                    {(comments[post.id] || []).length === 0 ? (
                                        <p className="text-gray-600">No comments available.</p>
                                    ) : (
                                        (comments[post.id] || []).map(comment => (
                                            <div key={comment.id} className="border-t pt-2 border-gray-200">
                                                {editCommentId === comment.id ? (
                                                    <>
                                                        <textarea
                                                            value={editCommentContent}
                                                            onChange={(e) => setEditCommentContent(e.target.value)}
                                                            className="w-full p-2 border rounded"
                                                        />
                                                        <button
                                                            onClick={() => handleEditComment(post.id, comment.id)}
                                                            className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                                                        >
                                                            Save Changes
                                                        </button>
                                                        <button
                                                            onClick={() => setEditCommentId(null)}
                                                            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="text-gray-800">{comment.content}</p>
                                                        <p className="text-gray-600 text-sm mt-1">BY: {comment.username}</p>
                                                        {currentUser && currentUser.id === comment.authorId && (
                                                            <>
                                                                <button
                                                                    onClick={() => {
                                                                        setEditCommentId(comment.id);
                                                                        setEditCommentContent(comment.content);
                                                                    }}
                                                                    className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded"
                                                                >
                                                                    Edit Comment
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteComment(post.id, comment.id)}
                                                                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                                                                >
                                                                    Delete Comment
                                                                </button>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                                {currentUser && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Add a comment"
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            className="mt-4 p-2 border rounded w-full"
                                        />
                                        <button
                                            onClick={() => handleAddComment(post.id)}
                                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                                        >
                                            Add Comment
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;
