import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MenuIcon, XIcon } from '@heroicons/react/outline'; // Assuming you're using Heroicons

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">BLOGS</Link>
                <div className="hidden md:flex items-center space-x-4">
                    {currentUser ? (
                        <>
                            <Link to="/my-posts" className="text-white hover:text-gray-400 transition-colors duration-300">My Blogs</Link>
                            <Link to="/new" className="text-white hover:text-gray-400 transition-colors duration-300">New Blog</Link>
                            <span className="text-white">{currentUser.firstname}</span>
                            <button onClick={logout} className="text-white hover:text-gray-400 transition-colors duration-300">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white hover:text-gray-400 transition-colors duration-300">Login</Link>
                            <Link to="/register" className="text-white hover:text-gray-400 transition-colors duration-300">Register</Link>
                        </>
                    )}
                </div>
                <div className="md:hidden">
                    <button onClick={handleMenuToggle} className="text-white focus:outline-none">
                        {menuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                    </button>
                </div>
            </div>
            {menuOpen && (
                <div className="md:hidden">
                    <div className="flex flex-col items-center space-y-4 mt-4">
                        {currentUser ? (
                            <>
                                <Link to="/my-posts" className="text-white hover:text-gray-400 transition-colors duration-300">My Blogs</Link>
                                <Link to="/new" className="text-white hover:text-gray-400 transition-colors duration-300">New Blog</Link>
                                <span className="text-white">{currentUser.firstname}</span>
                                <button onClick={logout} className="text-white hover:text-gray-400 transition-colors duration-300">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-white hover:text-gray-400 transition-colors duration-300">Login</Link>
                                <Link to="/register" className="text-white hover:text-gray-400 transition-colors duration-300">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
