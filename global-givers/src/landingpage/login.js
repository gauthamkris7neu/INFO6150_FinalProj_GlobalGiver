import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use useNavigate here

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Replace '/api/login' with your actual login API endpoint
            const response = await axios.post('/api/login', { email, password });
            // Assuming the API returns a token on successful login, save it in localStorage or in a cookie
            localStorage.setItem('token', response.data.token);
            // Redirect to the dashboard or another page using navigate
            navigate('/dashboard'); // Updated to use navigate
        } catch (error) {
            // Handle errors (e.g., wrong credentials) here
            setError('Failed to login. Please check your credentials.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
