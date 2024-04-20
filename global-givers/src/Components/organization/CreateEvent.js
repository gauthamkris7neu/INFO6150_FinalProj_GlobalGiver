import React, { useState } from 'react';
import { City, Country, State } from 'country-state-city';
import { Container, TextField, Button, Select, MenuItem, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    address: '',
    dateTime: '',
    organizer: '',
    donationNeeded: '',
    eventType: '',
    city: '',
    state: '',
    country: '',
    eventImage: null,
  });
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');


  const { user } = useSelector(state => state.login);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => {
    setFormData({ ...formData, eventImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventFormData = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      eventFormData.append(key, value);
    }
    formData.organizer = user.email;
    formData.state = State.getStateByCodeAndCountry(formData.state, formData.country).name;
    try {
        const response = await axios.post('http://localhost:8000/api/organization/create',  formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        });
        if (response.data) {
          setSuccessOpen(true);
        } else {
            setErrorOpen(true);
            setErrorMsg('Please Check the Entered Details');
        }
    } catch (err) {
        setErrorOpen(true);
        setErrorMsg(err.response.data.message);
    }
    
  };

  const handleDialogClose = () => {
    setSuccessOpen(false);
    setErrorOpen(false);
  };
  const filteredStates = State.getStatesOfCountry(formData.country);
  const filteredCities = City.getCitiesOfState(formData.country, formData.state);
  

  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          name="eventName"
          label="Event Name"
          fullWidth
          value={formData.eventName}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
        name="description"
        label="Description"
        fullWidth
        multiline
        rows={4}
        value={formData.description}
        onChange={handleInputChange}
        margin="normal"
      />

      <TextField
        name="address"
        label="Address"
        fullWidth
        value={formData.address}
        onChange={handleInputChange}
        margin="normal"
      />

      <TextField
        name="dateTime"
        label="Date and Time"
        type="datetime-local"
        fullWidth
        value={formData.dateTime}
        onChange={handleInputChange}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        name="organizer"
        label="Organizer"
        fullWidth
        value={user.email}
        onChange={handleInputChange}
        margin="normal"
      />

      {/* Donation Needed */}
      <TextField
        name="donationNeeded"
        label="Donation Needed"
        fullWidth
        type="number"
        value={formData.donationNeeded}
        onChange={handleInputChange}
        margin="normal"
      />

      {/* Event Type */}
      <TextField
        name="eventType"
        label="Event Type"
        fullWidth
        value={formData.eventType}
        onChange={handleInputChange}
        margin="normal"
      />

        <FormControl fullWidth margin="normal">
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            id="country"
            name="country"
            value={formData.country}
            label="Country"
            onChange={handleInputChange}
          >
            {Country.getAllCountries().map((country) => (
              <MenuItem key={country.isoCode} value={country.isoCode}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        {/* State Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="state-label">State</InputLabel>
          <Select
            labelId="state-label"
            id="state"
            name="state"
            value={formData.state}
            label="State"
            onChange={handleInputChange}
          >
            {filteredStates.map((state) => (
              <MenuItem key={state.isoCode} value={state.isoCode}>
                {state.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="city-label">City</InputLabel>
          <Select
            labelId="city-label"
            id="city"
            name="city"
            value={formData.city}
            label="City"
            onChange={handleInputChange}
          >
            {filteredCities.map((city) => (
              <MenuItem key={city.name} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
        variant="contained"
        component="label"
        fullWidth
        sx={{ mt: 2 }}
      >
        Upload Event Image
        <input
          type="file"
          name="eventImage"
          hidden
          onChange={handleFileChange}
        />
      </Button>
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Event
        </Button>
      </form>
      <Dialog open={successOpen} onClose={handleDialogClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <DialogContentText>The event has been created successfully.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>OK</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={errorOpen} onClose={handleDialogClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CreateEventPage;