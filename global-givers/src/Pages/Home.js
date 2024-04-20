import React from 'react';
import { Typography, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Home = () => {
  const navigate = useNavigate();
  const { loggedIn } = useSelector(state => state.login);
  const imageCount = 5;
  const images = Array.from({ length: imageCount }, (_, i) => `/images/Image${i + 1}.png`);
  
  const styles = {
    root: {
      padding: '20px',
    },
    donateButton: {
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)'
    },
    donateBox: {
      width: '100%', 
      height: 300, 
      backgroundColor: 'grey', 
      mt: 2, 
      position: 'relative',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    eventsBox: {
      width: '100%', 
      height: 300, 
      backgroundColor: 'grey', 
      mt: 2, 
      position: 'relative',
      backgroundImage: 'url("/bgImages/eventsBackground.webp")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    imageGalleryContainer: {
      overflow: 'hidden', 
      mt: 2,
      display: 'flex',
      width: `calc(300px * ${imageCount})`, 
      animation: 'slide 20s infinite linear'
    },
    imageBox: {
      width: 300, 
      height: 200, 
      mr: 1
    },
    joinButton: {
      mt: 2
    },
    paperStyle: {
      margin: '20px', 
      padding: '20px'
    }
  };

  const handleDonateClick = () => navigate('/events');
  const handleJoinNowClick = () => navigate('/register');

  return (
    <div style={styles.root}>
      <Typography variant="body1">
        Welcome to the Global Givers platform! Here, you can find volunteering events and donation opportunities from various NGOs.
      </Typography>
      <Box sx={styles.donateBox}>
      <video autoPlay loop muted style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src="/videos/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Button variant="contained" color="secondary" onClick={handleDonateClick} sx={styles.donateButton}>
          Donate
        </Button>
      </Box>
      <Paper elevation={3} sx={styles.paperStyle}>
        <Typography variant="h6">About Global Givers</Typography>
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
      <Box sx={{ overflow: 'hidden', mt: 2 }}>
        <Box sx={styles.imageGalleryContainer}>
          {images.map((src, index) => (
            <Box key={index} sx={styles.imageBox}>
              <img src={src} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '100%' }} />
            </Box>
          ))}
        </Box>
      </Box>
      {!loggedIn && <Box sx={styles.eventsBox}>
        <Button variant="contained" color="primary" onClick={handleJoinNowClick} sx={styles.donateButton}>
          Join Now!
        </Button>
      </Box>}
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