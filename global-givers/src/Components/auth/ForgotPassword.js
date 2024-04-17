import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ severity: 'info', message: '' });

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Simulating an API call
            console.log('Requesting password reset for:', email);
            // Here you would typically call an API function to handle the password reset request
            // For example: await requestPasswordReset(email);
            setAlert({ severity: 'success', message: 'A link to reset your password has been sent to your email address.' });
            setOpen(true);
        } catch (error) {
            console.error('Failed to request password reset:', error);
            setAlert({ severity: 'error', message: 'Failed to request password reset. Please try again later.' });
            setOpen(true);
        }
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
        <Container component="main" maxWidth="xs">
            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ margin: '24px 0 16px' }}
                    >
                        Request Password Reset
                    </Button>
                </form>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default ForgotPassword;
