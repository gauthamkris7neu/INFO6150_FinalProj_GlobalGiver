import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'
import logo from '../../Components/assets/GG Logo 1.png';

const Navbar = ({ isLoggedIn, handleLogout, userType }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo as Home button */}
        <IconButton edge="start" color="inherit" aria-label="home" component={RouterLink} to="/" sx={{ mr: 2 }}>
          <img src={logo} alt="Global Givers Logo" style={{ height: '48px' }} />
        </IconButton>
        {/* Title next to logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Global Givers
        </Typography>
        {/* Conditionally render Navigation Links based on user type */}
        <Button color="inherit" component={RouterLink} to="/">Home</Button>
        {userType === 'organization' ? (
          <>
            <Button color="inherit" component={RouterLink} to="/events/manage">Manage Events</Button>
            <Button color="inherit" component={RouterLink} to="/donations/manage">Manage Donations</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/events">Events</Button>
            <Button color="inherit" component={RouterLink} to="/donations">Donations</Button>
            <Button color="inherit" component={RouterLink} to="/profile">Profile</Button>
          </>
        )}
        {/* Authentication Buttons */}
        {isLoggedIn ? (
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/login">Login</Button>
            <Button color="inherit" component={RouterLink} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;