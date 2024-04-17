import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const DonationList = ({ donations }) => {
  return (
    <List>
      {donations.map((donation, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography variant="subtitle1">
                  {`$${donation.amount}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`Date: ${new Date(donation.date).toLocaleDateString()}`}
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography variant="body2">
                  {`Donor: ${donation.donor}`}
                </Typography>
                <Typography variant="body2">
                  {`Purpose: ${donation.purpose}`}
                </Typography>
                {/* Add more details as needed */}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default DonationList;
