import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import API_BASE_URL from '../config';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if already logged in
        const checkAuth = async () => {
            const token = localStorage.getItem('adminToken');
            if (token) {
                try {
                    const response = await axios.get(`${API_BASE_URL}/api/verify-token`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (response.data.valid) {
                        navigate('/admin');
                    }
                } catch (error) {
                    localStorage.removeItem('adminToken');
                }
            }
        };
        
        checkAuth();
    }, [navigate]);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/login`,
                credentials
            );
            
            if (response.data.token) {
                localStorage.setItem('adminToken', response.data.token);
                // Clear form
                setCredentials({ username: '', password: '' });
                // Redirect to admin page
                navigate('/admin', { replace: true });
            } else {
                setError('Login failed - no token received');
            }
        } catch (error) {
            console.error('Login error:', error.response || error);
            setError(error.response?.data?.message || 'Invalid credentials');
            // Clear password field on error
            setCredentials(prev => ({ ...prev, password: '' }));
        } finally {
            setLoading(false);
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
                        disabled={loading}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login; 