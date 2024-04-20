import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../Components/assets/GG Logo 1.png';

const Navbar = ({ isLoggedIn, handleLogout, userType }) => {
  const renderLinkButton = (text, to, style, onClick) => (
    <Button color="inherit" component={RouterLink} to={to} onClick={onClick} sx={style}>
      {text}
    </Button>
  );

  const theme = useTheme();

  const styles = {
    appBar: {
      backgroundColor: '#003366',
      boxShadow: theme.shadows[4],
    },
    logoButton: {
      marginRight: theme.spacing(2),
    },
    logo: {
      height: '35px',
    },
    title: {
      flexGrow: 1,
      fontWeight: 600,
    },
    button: {
      margin: theme.spacing(1),
      '&:hover': {
        backgroundColor: '#003366',
      },
    },
  };

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          component={RouterLink}
          to="/"
          sx={styles.logoButton}
        >
          <img src={logo} alt="Global Givers Logo" style={styles.logo} />
        </IconButton>
        <Typography variant="h6" component="div" sx={styles.title}>
          Global Givers
        </Typography>
        {renderLinkButton("Home", "/", styles.button)}
        {isLoggedIn ? (
          <>
            {userType !== 'admin' ? 
        <>
        {userType === 'organization' ? (
          <>
            {renderLinkButton("Create Event", "/createEvents", styles.button)}
            {renderLinkButton("Profile", "/profile", styles.button)}
          </>
        ) : (
          <>
                {renderLinkButton("Events", "/events", styles.button)}
                {renderLinkButton("Profile", "/profile", styles.button)}
              </>
        )}
        </>


              : (<></>)}
            {renderLinkButton("Logout", "#", styles.button, handleLogout)}
          </>
        ) : (
          <>
            {renderLinkButton("Login", "/login", styles.button)}
            {renderLinkButton("Register", "/register", styles.button)}
          </>
        )}

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;