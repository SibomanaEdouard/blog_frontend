import React, { useContext, useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosConfig';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    const response = await axiosInstance.get('/users/me');
                    setCurrentUser(response.data.data); 
                } catch (error) {
                    console.error('Error fetching user:', error);
                    setCurrentUser(null);
                    localStorage.removeItem('authToken');
                }
            }
            setLoading(false);
        };

        checkUser();
    }, []);

    const login = async ({ email, password }) => {
        try {
            const response = await axiosInstance.post('/users/login', { email, password });
            const token = response.data.data.data; // Access the token
            localStorage.setItem('authToken', token);
            const userResponse = await axiosInstance.get('/users/me');
            setCurrentUser(userResponse.data.data); 
            return response.data.message;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Login failed');
        }
    };

    const register = async ({ email, password, firstname, lastname }) => {
        try {
            const response = await axiosInstance.post('/users/register', {
                email,
                password,
                firstname,
                lastname
            });
            setCurrentUser(response.data.user); 
            return response.data.message;  // Return success message from backend
        } catch (error) {
            throw new Error(error.response.data.error || 'Registration failed');
        }
    };

    const logout = async () => {
        try {
            await axiosInstance.post('/users/logout');
            setCurrentUser(null);
            localStorage.removeItem('authToken');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const value = {
        currentUser,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
