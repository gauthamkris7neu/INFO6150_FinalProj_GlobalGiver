import React, { useState, useEffect } from 'react';
import { Paper, Typography, Avatar, Button, Tab, Tabs, Box, TextField, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// import TabPanel from './TabPanel'; // A component for rendering tab panels

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
const initialProfileData = {
  individual: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate volunteer and community contributor',
    avatarUrl: 'path-to-individual-avatar.png',
    userType: 'individual'
  },
  organization: {
    name: 'Helpful Hands',
    bio: 'Dedicated to helping through action and funding',
    avatarUrl: 'path-to-organization-avatar.png',
    userType: 'organization'
  }
};
function Profile() {
  const [profileData, setProfileData] = useState(initialProfileData['organization']); // Default to individual
  const [value, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 800, margin: 'auto' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <StyledAvatar alt={profileData.name} src={profileData.avatarUrl} />
        </Grid>
        <Grid item xs>
          <Typography variant="h5">{profileData.name}</Typography>
          <Typography variant="body1">{profileData.bio}</Typography>
        </Grid>
      </Grid>
      <Tabs value={value} onChange={handleTabChange} aria-label="Profile Tabs">
        <Tab label="Past Activity" />
        <Tab label="Upcoming Events" />
        {profileData.userType === 'organization' && <Tab label="Post Event" />}
      </Tabs>
      <TabPanel value={value} index={0}>
        {/* Display past donations or participations */}
        Past activities go here...
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* Display upcoming registered events or organization events */}
        Upcoming events go here...
      </TabPanel>
      {profileData.userType === 'organization' && (
        <TabPanel value={value} index={2}>
          {/* Form for organizations to post new events */}
          <Typography variant="h6">Post a New Event</Typography>
          <TextField fullWidth label="Event Name" variant="outlined" sx={{ mb: 2 }} />
          <TextField fullWidth label="Date and Time" type="datetime-local" InputLabelProps={{ shrink: true }} variant="outlined" sx={{ mb: 2 }} />
          <TextField fullWidth label="Description" multiline rows={4} variant="outlined" sx={{ mb: 2 }} />
          <Button variant="contained" color="primary">Submit Event</Button>
        </TabPanel>
      )}
    </Paper>
  );
}
export default Profile;



