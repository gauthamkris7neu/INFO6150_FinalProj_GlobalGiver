import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Updated to useNavigate

const PostEvent = () => {
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Updated to useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Replace '/api/events' with your actual API endpoint for posting an event
            await axios.post('/api/events', { eventName, description, date });
            // Redirect to the org dashboard or the page showing the event's details
            navigate('/org-dashboard'); // Adjust as needed, using navigate
        } catch (error) {
            console.error('Error posting the event:', error);
            setError('Failed to post the event. Please try again.');
        }
    };

    return (
        <div>
            <h2>Post an Event</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Event Name:</label>
                    <input
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Post Event</button>
            </form>
        </div>
    );
};

export default PostEvent;
