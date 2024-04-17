import React from 'react';
import { Typography, Avatar } from '@mui/material';

const Profile = ({ user }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Profile Page
      </Typography>
      <Avatar alt={user.name} src={user.avatarUrl} sx={{ width: 100, height: 100 }} />
      <Typography variant="h6" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {user.email}
      </Typography>
      <Typography variant="body1">
        Bio: {user.bio}
      </Typography>
    </div>
  );
};

export default Profile;
