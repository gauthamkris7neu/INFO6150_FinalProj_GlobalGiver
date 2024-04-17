import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const Donations = () => {
  const [donations, setDonations] = useState([]);

  // Dummy data for demonstration
  const dummyDonations = [
    { id: 1, amount: 50, donor: 'John Doe', purpose: 'General Donation' },
    { id: 2, amount: 100, donor: 'Jane Smith', purpose: 'Education Fund' },
    { id: 3, amount: 25, donor: 'Alice Johnson', purpose: 'Healthcare Support' },
  ];

  // Fetch donations (simulated API call)
  const fetchDonations = () => {
    // In a real application, you would fetch data from your backend API
    setDonations(dummyDonations);
  };

  // useEffect hook to fetch donations on component mount
  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Donations Page
      </Typography>
      <Typography variant="body1">
        Welcome to the donations page. Below are the recent donations:
      </Typography>
      <List>
        {donations.map((donation) => (
          <ListItem key={donation.id}>
            <ListItemText 
              primary={`$${donation.amount} - ${donation.donor}`} 
              secondary={`Purpose: ${donation.purpose}`} 
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Donations;
