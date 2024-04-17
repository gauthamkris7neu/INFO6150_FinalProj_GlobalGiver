import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function Login() {
  const [credentials, setCredentials] = useState({
    userType: 'individual',  // Default to 'individual'
    username: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Authentication logic should take into account the userType
    console.log('Login attempt with:', credentials);
    // You would typically call a login function from your auth API utility here
  };

  return (
    <Container component="main" maxWidth="xs">
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 1 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="user-type-select-label">Login as</InputLabel>
            <Select
              labelId="user-type-select-label"
              id="userType"
              name="userType"
              value={credentials.userType}
              label="Login as"
              onChange={handleChange}
            >
              <MenuItem value="individual">Individual Volunteer/Donor</MenuItem>
              <MenuItem value="organization">Organization</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={credentials.username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '24px 0 16px' }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Button color="primary" href="/forgot-password" style={{ textTransform: 'none' }}>
                Forgot password?
              </Button>
            </Grid>
            <Grid item>
              <Button color="primary" href="/register" style={{ textTransform: 'none' }}>
                Don't have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
