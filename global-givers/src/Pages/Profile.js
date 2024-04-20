import React, { useState, useEffect } from 'react';
import { Paper, Typography, Avatar, Button, Tab, Tabs, Box, TextField, Grid,  List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}


const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(1)
}));

function Profile() {
  const [profileData, setProfileData] = useState({});
  const [value, setValue] = useState(0);
  const [events, setEvents] = useState([]);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const { user } = useSelector(state => state.login);
  const userType = user ? user.userType : null;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const url = userType === 'organization' ? 'http://localhost:8000/api/organization/getAll' : 'http://localhost:8000/api/events/getRegisteredEvents'
        const response = await axios.get(url, {
          params: {email: user.email}
        });
        console.log('Fetched events:', response.data);
        setEvents(userType === 'organization' ? response.data?.events : response.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/users/getUserInfo', {
            params: { email: user.email }
          });
          setProfileData(response.data.user);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };
    fetchUsers();
    fetchEvents();
}, []);

const now = new Date();

const pastEvents = events.filter(event => 
  new Date(event.dateTime) < now
);

const upcomingEvents = events.filter(event => 
  new Date(event.dateTime) >= now
);

console.log('Past events:', pastEvents);
console.log('Upcoming events:', upcomingEvents);
  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 800, margin: 'auto' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <StyledAvatar alt={profileData.fullName} src={profileData.avatarUrl} />
        </Grid>
        <Grid item xs>
          <Typography variant="h5">{profileData.fullName}</Typography>
          <Typography variant="body1">{profileData.email}</Typography>
        </Grid>
      </Grid>
      <Tabs value={value} onChange={handleTabChange} aria-label="Profile Tabs">
        <Tab label="Past Activity" />
        <Tab label="Upcoming Events" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <List>
          {pastEvents.map(event => (
            <ListItem key={event._id}>
              <ListItemText primary={event.eventName} secondary={format(parseISO(event.dateTime), 'PPPp')} />
            </ListItem>
          ))}
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List>
          {upcomingEvents.map(event => (
            <ListItem key={event._id}>
              <ListItemText primary={event.eventName} secondary={format(parseISO(event.dateTime), 'PPPp')} />
            </ListItem>
          ))}
        </List>
      </TabPanel>
    </Paper>
  );
}
export default Profile;



