import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const DonationForm = () => {
  const [amount, setAmount] = useState('');

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission (e.g., send donation amount to backend)
    console.log(`Donation amount: ${amount}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Enter donation amount"
        variant="outlined"
        value={amount}
        onChange={handleAmountChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Donate
      </Button>
    </form>
  );
};

export default DonationForm;
