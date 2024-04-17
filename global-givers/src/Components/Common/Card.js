import React from 'react';
import { Card as MuiCard, CardContent, Typography, CardActions, Button } from '@mui/material';

const Card = ({ title, description, buttonText, buttonOnClick }) => {
  return (
    <MuiCard sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={buttonOnClick}>{buttonText}</Button>
      </CardActions>
    </MuiCard>
  );
};

export default Card;
