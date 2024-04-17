import React, { useState } from 'react';
import { Typography, Avatar, Grid, Card, CardContent, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(1)
}));

// Dummy data for the sake of this example
const userData = {
  individual: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate volunteer and community contributor',
    avatarUrl: 'path-to-your-individual-user-avatar.png',
  },
  organization: {
    organizationName: 'Global Givers Foundation',
    contactEmail: 'info@globalgiversfoundation.org',
    mission: 'We strive to make a difference in the lives of children and families across the globe.',
    logoUrl: 'path-to-your-organization-logo.png',
  }
};

const Profile = () => {
  // State to manage the user type
  const [userType, setUserType] = useState('individual'); // This will dynamically come from your auth system

  // Depending on the userType, pick the correct profile data
  const profileData = userType === 'individual' ? userData.individual : userData.organization;

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 600, margin: 'auto' }}>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item>
          <StyledAvatar alt={profileData.name || profileData.organizationName} src={profileData.avatarUrl || profileData.logoUrl} />
        </Grid>
        <Grid item xs>
          <Typography variant="h5" component="h2" gutterBottom>
            {userType === 'individual' ? `Hello, ${profileData.name}` : profileData.organizationName}
          </Typography>
          <Typography variant="body1">
            {userType === 'individual' ? `Email: ${profileData.email}` : `Contact: ${profileData.contactEmail}`}
          </Typography>
          {userType === 'individual' && (
            <Typography variant="body2" color="text.secondary">
              Bio: {profileData.bio}
            </Typography>
          )}
          {userType === 'organization' && (
            <Typography variant="body2" color="text.secondary">
              Mission: {profileData.mission}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        {/* Additional information can go here */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                {userType === 'individual' ? 'My Contributions' : 'Our Impact'}
              </Typography>
              {/* Display user or organization specific content */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Edit Profile
      </Button>
    </Paper>
  );
};

export default Profile;
