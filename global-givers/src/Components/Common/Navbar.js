import React from 'react';
import { Typography, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate('/donations'); // Redirect to the donations page
  };

  const handleJoinNowClick = () => {
    navigate('/register'); // Redirect to the sign-up page
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Home Page
      </Typography>
      <Typography variant="body1">
        Welcome to the Global Givers platform! Here, you can find volunteering events and donation opportunities from various NGOs.
      </Typography>
      {/* Placeholder for the horizontal image */}
      <Box sx={{ width: '100%', height: 300, backgroundColor: 'grey', mt: 2, position: 'relative' }}>
        <Button variant="contained" color="secondary" onClick={handleDonateClick} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          Donate
        </Button>
      </Box>
      <Paper elevation={3} sx={{ margin: '20px', padding: '20px' }}>
        <Typography variant="h6">
          About Global Givers
        </Typography>
        <Typography variant="body1" paragraph>
          Global Givers is a dedicated platform designed to connect individuals and organizations with a wide array of non-profit organizations globally. Our mission is to empower these organizations by providing a space where they can effectively showcase their upcoming volunteering events and critical donation opportunities.
        </Typography>
        <Typography variant="body1" paragraph>
          By participating in our platform, you're not just giving money or time; you're becoming part of a larger community committed to making tangible differences in diverse areas such as education, environmental conservation, and public health. Whether you're an individual looking to make a difference through volunteer work or a donor seeking to contribute to crucial causes, Global Givers facilitates these connections.
        </Typography>
        <Typography variant="body1" paragraph>
          Our platform also offers tools and resources to help non-profits manage events, track donations, and engage with their communities more effectively. We believe that by working together, we can create a more equitable world where every contribution helps in building sustainable solutions to pressing global issues.
        </Typography>
        <Typography variant="body1" paragraph>
          Join our growing network today to start making an impact or browse through our site to learn more about various causes and how you can be a part of positive change.
        </Typography>
      </Paper>
      {/* Sliding gallery placeholder */}
      <Box sx={{ overflow: 'hidden', mt: 2 }}>
        <Box sx={{
          display: 'flex',
          width: 'calc(300px * 5)', // Assuming 5 images, each 300px wide
          animation: 'slide 20s infinite linear'
        }}>
          {/* Images from your folder */}
          <img src= "Pages/Images/Image 1.png" alt="Gallery Image 1" style={{ width: 300, height: 200, marginRight: '1px' }} />
          <img src= "Pages/Images/Image 2.png" alt="Gallery Image 2" style={{ width: 300, height: 200, marginRight: '1px' }} />
          <img src= "Pages/Images/Image 3.png" alt="Gallery Image 3" style={{ width: 300, height: 200, marginRight: '1px' }} />
          <img src= "Pages/Images/Image 4.png" alt="Gallery Image 4" style={{ width: 300, height: 200, marginRight: '1px' }} />
          <img src= "Pages/Images/Image 5.png" alt="Gallery Image 5" style={{ width: 300, height: 200 }} />
        </Box>
      </Box>
      {/* Join Now Button */}
      <Button variant="contained" color="primary" onClick={handleJoinNowClick} sx={{ mt: 2 }}>
        Join Now
      </Button>
      {/* Add keyframes for sliding effect */}
      <style>
        {`
          @keyframes slide {
            from { transform: translateX(0); }
            to { transform: translateX(-1500px); }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
