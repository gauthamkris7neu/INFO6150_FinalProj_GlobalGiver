import React, { useState, useEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import EventCard from '../Components/Events/EventCard';
// import { getEvents } from '../Utils/';

const Events = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from API
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const eventsData = await getEvents(); // Assuming you have a function to fetch events from your API
  //     setEvents(eventsData);
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Events Page
      </Typography>
      <Typography variant="body1">
        Check out the upcoming events below:
      </Typography>
      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid item key={event.id} xs={12} sm={6} md={4}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Events;
