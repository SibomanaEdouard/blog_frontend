import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const message = await login({ email, password });
            setSuccess(message);
            setTimeout(() => {
                navigate('/'); // Navigate immediately after successful login
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            setError(error.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white shadow-2xl rounded-lg">
                <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Login</h1>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors duration-300">
                    Login
                </button>
                {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}
                {success && <p className="mt-4 text-green-500 font-semibold">{success}</p>}
            </form>
        </div>
    );
};

export default Login;
