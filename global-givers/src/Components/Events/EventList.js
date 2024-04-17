import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import EventCard from './EventCard'; // Make sure to have an EventCard component
import { fetchEvents } from '../utils/api'; // Assuming you have this function to fetch events from your API

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadEvents = async () => {
            setLoading(true);
            try {
                const data = await fetchEvents();
                setEvents(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch events.');
                setLoading(false);
                console.error(err);
            }
        };

        loadEvents();
    }, []);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom component="div" style={{ marginTop: '20px' }}>
                Upcoming Events
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <Grid container spacing={4}>
                    {events.map(event => (
                        <Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
                            <EventCard event={event} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default EventList;
