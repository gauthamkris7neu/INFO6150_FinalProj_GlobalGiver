import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  LinearProgress,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  useTheme
} from '@mui/material';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';

const EventCard = ({ event, onRegister, onDonate }) => {
  const donationProgress = (parseInt(event.donationReceived) / parseInt(event.donationNeeded)) * 100;
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        sx={{ height: 160, objectFit: 'cover' }}
        image={`http://localhost:8000/${event.eventImage}`}
        alt={event.eventName}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {event.eventName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          {event.description}
        </Typography>
        <Box sx={{ mt: 2, mb: 1 }}>
          <Typography variant="body2">
            When: {format(parseISO(event.dateTime), 'PPPp')}
          </Typography>
          <Typography variant="body2">
            Where: {event.address}, {event.city}, {event.state}
          </Typography>
          <Typography variant="body2">
            Organizer: {event.organizer}
          </Typography>
          <Typography variant="body2" color={theme.palette.text.secondary} sx={{ my: 1 }}>
            Donations: ${event.donationReceived.toLocaleString()} of ${event.donationNeeded.toLocaleString()} collected...
          </Typography>
          <LinearProgress variant="determinate" value={donationProgress} />
        </Box>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button variant="contained" color="primary" fullWidth onClick={() => onRegister(event._id)}>
          Register
        </Button>
        <Button variant="contained" color="secondary" sx={{marginTop: 2}} fullWidth onClick={() => onDonate(event._id)}>
          Donate
        </Button>
      </Box>
    </Card>
  );
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [donateDialogOpen, setDonateDialogOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [currentEventId, setCurrentEventId] = useState(null);
  const [location, setLocation] = useState({ city: '', state: '' });

  const { user } = useSelector(state => state.login);

  const fetchEvents = async (city, state) => {
    try {
      const response = await axios.get('http://localhost:8000/api/events/getAllEventsByLocation', {
        params: { city: city, state: state }
      });
      setEvents(response.data.events);
      setFilteredEvents(response.data.events); // Initialize filteredEvents with all events
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const getLocationFromIP = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=1b7538dacbd14bf5be3fad985d28bf7a`);
          const results = response.data.results[0].components;
          fetchEvents(results.city, results.state);
        } catch (error) {
          console.error("Error fetching location data:", error);
        }
      }, (error) => {
        console.error("Error obtaining location:", error);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocationFromIP();
  }, []);

  useEffect(() => {
    const filtered = events.filter(event =>
      event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchQuery, events]);

  const handleRegisterClick = async (eventId) => {
    try {
      await axios.post(`http://localhost:8000/api/events/register`, {eventId, email: user.email});
      setDialogContent('You have successfully registered for the event.');
      setDialogOpen(true);
    } catch (error) {
      setDialogContent(error.response.data || 'An error occurred during registration.');
      setDialogOpen(true);
    }
  };

  

  const handleDonateSubmit = async () => {
    try {
      await axios.post(`http://localhost:8000/api/events/${currentEventId}/donate`, {
        eventId: currentEventId,
        email: user.email,
        amount: donationAmount,
      });
      setDialogContent('Your donation has been successfully submitted.');
      setDialogOpen(true);
      setDonateDialogOpen(false);
      setDonationAmount('');
      getLocationFromIP();
    } catch (error) {
      setDialogContent(error.response.data || 'An error occurred during donation.');
      setDialogOpen(true);
      setDonateDialogOpen(false);
    }
  };

  const handleDonateClick = async (eventId) => {
    setCurrentEventId(eventId);
    setDonateDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseDonateDialog = () => {
    setDonateDialogOpen(false);
    setDonationAmount('');
  };

  return (
    <>
      <Box sx={{ padding: 3 }}>
        <TextField
          fullWidth
          label="Search Events"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      <Grid container spacing={2} alignItems="stretch">
        {filteredEvents.map(event => (
          <Grid item xs={12} sm={6} md={4} key={event._id} margin={5}>
            <EventCard event={event} onRegister={handleRegisterClick} onDonate={handleDonateClick} />
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Registration Status"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={donateDialogOpen} onClose={handleCloseDonateDialog}>
        <DialogTitle>Donate to Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the amount you would like to donate:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="donationAmount"
            label="Donation Amount"
            type="number"
            fullWidth
            variant="standard"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDonateDialog}>Cancel</Button>
          <Button onClick={handleDonateSubmit}>Donate</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Events;
