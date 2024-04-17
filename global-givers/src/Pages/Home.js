import React from 'react';
import { Typography, Button } from '@mui/material';

const Home = () => {
  const handleLearnMoreClick = () => {
    // Handle "Learn More" button click event
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Home Page
      </Typography>
      <Typography variant="body1">
        Welcome to the Global Givers platform! Here, you can find volunteering events and donation opportunities from various NGOs.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLearnMoreClick}>
        Learn More
      </Button>
    </div>
  );
};

export default Home;
