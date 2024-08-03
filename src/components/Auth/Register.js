import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
    const { register } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastname] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const message = await register({ email, password, firstname, lastname });
            setSuccess(message);  // Display the success message from the backend
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            setError(error.response.data.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-100 to-yellow-100 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-lg p-10 bg-white shadow-2xl rounded-lg">
                <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Register</h1>
                {error && <div className="mb-4 text-red-500 font-semibold">{error}</div>}
                {success && <div className="mb-4 text-green-500 font-semibold">{success}</div>}
                <div className="mb-4">
                    <label htmlFor="firstname" className="block text-gray-700 font-semibold mb-2">First Name</label>
                    <input
                        type="text"
                        id="firstname"
                        placeholder="First Name"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastname" className="block text-gray-700 font-semibold mb-2">Last Name</label>
                    <input
                        type="text"
                        id="lastname"
                        placeholder="Last Name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition-colors duration-300">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
