import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Updated to useNavigate

const EditProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Updated to useNavigate

    useEffect(() => {
        // Fetch the current user's profile information to populate the form
        // Replace '/api/profile' with the actual endpoint to fetch profile details
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/profile');
                setName(response.data.name);
                setEmail(response.data.email);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError('Failed to fetch profile details.');
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Replace '/api/profile' with your actual API endpoint for updating profile details
            await axios.put('/api/profile', { name, email });
            // Optionally redirect the user after a successful update
            navigate('/profile'); // Updated to use navigate
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile. Please try again.');
        }
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;
