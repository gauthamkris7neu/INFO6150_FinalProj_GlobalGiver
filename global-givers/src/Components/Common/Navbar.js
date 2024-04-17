import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Menu Icon for mobile devices */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        {/* Logo or Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Global Givers
        </Typography>
        {/* Navigation Links */}
        <Button color="inherit" component={RouterLink} to="/">Home</Button>
        <Button color="inherit" component={RouterLink} to="/events">Events</Button>
        <Button color="inherit" component={RouterLink} to="/donations">Donations</Button>
        <Button color="inherit" component={RouterLink} to="/profile">Profile</Button>
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
