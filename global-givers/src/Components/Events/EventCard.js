import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material';

const EventCard = ({ event }) => {
  const { title, date, location, description, imageUrl } = event;  // Assuming 'imageUrl' holds the URL to the event image

  return (
    <Card sx={{ maxWidth: 345 }}>
      {imageUrl && (
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={`Image for ${title}`}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {date}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {location}
        </Typography>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
