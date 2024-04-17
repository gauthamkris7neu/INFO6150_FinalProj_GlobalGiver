import React from 'react';
import { Paper, Typography, Divider, Button } from '@mui/material';

const EventDetails = ({ event }) => {
  const { title, date, location, description } = event;

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Date: {date}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Location: {location}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body1" paragraph>
        {description}
      </Typography>
      <Button variant="contained" color="primary" size="large">
        Register Now
      </Button>
    </Paper>
  );
};

export default EventDetails;
