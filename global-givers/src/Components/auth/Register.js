import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel, Link, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Register() {
  const [formData, setFormData] = useState({
    userType: '',
    fullName: '',
    email: '',
    password: '',
    organizationName: '',
    orgFile: null
  });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    setFormData(prev => ({
      ...prev,
      orgFile: event.target.files[0]
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Registration data:', formData);
    try {
        const response = await axios.post('http://localhost:8000/api/users/register',  formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        });
        if (response.data) {
          navigate('/');
        }
    } catch (err) {
        console.log(err);
    }
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Container component="main" maxWidth="sm">
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 1 }}>
          <FormControl fullWidth style={{ marginBottom: 16 }}>
            <InputLabel id="user-type-label">Register As</InputLabel>
            <Select
              labelId="user-type-label"
              id="userType"
              name="userType"
              value={formData.userType}
              label="Register As"
              onChange={handleChange}
            >
              <MenuItem value="donor">Individual Volunteer/Donor</MenuItem>
              <MenuItem value="organization">Organization</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Username"
            name="fullName"
            autoComplete="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
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
            value={formData.password}
            onChange={handleChange}
          />
          {formData.userType === 'organization' && (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="organizationName"
                label="Organization Name"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span" style={{ margin: '10px 0' }}>
                  Upload Certificate
                </Button>
              </label>
            </>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '24px 0 16px' }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          {formData.userType === 'organization' ? 
            "Your account is pending verification. You will be notified once your account is verified." :
            "Your registration is successful. Please log in to continue."}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Register;
