import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

// Use the same port configuration as Dashboard
const PORT = import.meta.env.VITE_PORT || 3306;

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Attempting login...'); // Debug log
            const response = await axios.post(
                `http://localhost:${PORT}/api/login`,
                credentials
            );
            
            console.log('Login response:', response.data); // Debug log
            
            if (response.data.token) {
                console.log('Token received, storing...'); // Debug log
                localStorage.setItem('adminToken', response.data.token);
                console.log('Token stored, navigating...'); // Debug log
                navigate('/admin');
            } else {
                console.log('No token in response'); // Debug log
                setError('Login failed - no token received');
            }
        } catch (error) {
            console.error('Login error:', error.response || error);
            setError(error.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Admin Login</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login; 