import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ children, color = "primary", variant = "contained", ...props }) => {
  return (
    <MuiButton 
      variant={variant} 
      color={color} 
      {...props}
      sx={{
        borderRadius: '20px',
        padding: '10px 20px',
        fontWeight: 'bold',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: color === "primary" ? '#1976d2' : '#4caf50', // Darken the background color on hover
          boxShadow: 'none',
        },
      }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
