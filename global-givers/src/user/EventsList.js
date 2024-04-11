import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventsList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            // Replace '/api/events' with your actual API endpoint to fetch events
            const response = await axios.get('/api/events');
            setEvents(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching events:', error);
            setError('Failed to load events.');
            setLoading(false);
        }
    };

    if (loading) return <div>Loading events...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Events List</h2>
            {events.length > 0 ? (
                <ul>
                    {events.map((event) => (
                        <li key={event._id}>
                            <h3>{event.name}</h3>
                            <p>{event.description}</p>
                            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                            {/* Add more details or actions for each event as needed */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No events found.</p>
            )}
        </div>
    );
};

export default EventsList;
