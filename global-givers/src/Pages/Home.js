import React from 'react';
import { Typography, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const imageCount = 5;
  const images = Array.from({ length: imageCount }, (_, i) => `/images/Image${i + 1}.png`);

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
      {/* Video background for the Donate button */}
      <Box sx={{ width: '100%', height: 300, mt: 2, position: 'relative', overflow: 'hidden' }}>
        <video autoPlay loop muted style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src="/videos/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Button variant="contained" color="secondary" onClick={handleDonateClick} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
          Donate
        </Button>
      </Box>
      <Paper elevation={3} sx={{ margin: '20px', padding: '20px' }}>
        <Typography variant="h6">
          About Global Givers-

          
          We are more than just a fundraising community; it's a family united by a mission to ignite positive change. Here, every member is valued, every story honored, and every action aimed at fostering a meaningful impact.

We embrace diverse causes, from revitalizing local spaces to supporting global humanitarian efforts. Innovation is our heartbeat; whether it’s a charity concert or a bake sale, every initiative is a testament to our creativity and dedication.

Our impact is felt in the laughter of children in new playgrounds, the gratitude of families in homes we've built, and the restored greenery of local parks, every hand joined in aid strengthens the fabric of our shared humanity, and every success is a celebration of our collective spirit.

Join us, where giving is family, and together, we create a legacy of hope and unity.
        </Typography>
        {/* More content and paragraphs */}
      </Paper>
      {/* Sliding gallery placeholder */}
      <Box sx={{ overflow: 'hidden', mt: 2 }}>
        <Box sx={{
          display: 'flex',
          width: `calc(300px * ${imageCount})`,
          animation: 'slide 20s infinite linear'
        }}>
          {images.map((src, index) => (
            <Box key={index} sx={{ width: 300, height: 200, mr: 1 }}>
              <img src={src} alt={`Image ${index + 1}`} style={{ width: '100%', height: '100%' }} />
            </Box>
          ))}
        </Box>
      </Box>
      <Button variant="contained" color="primary" onClick={handleJoinNowClick} sx={{ mt: 2 }}>
        Join Now
      </Button>
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
