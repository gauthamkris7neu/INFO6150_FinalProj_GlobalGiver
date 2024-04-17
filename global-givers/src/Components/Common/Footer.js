import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = () => {
    return (
        <Box bgcolor="text.secondary" color="white" mt={5} py={3}>
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body1">
                            <PhoneIcon /> +123 456 7890
                        </Typography>
                        <Typography variant="body1">
                            <EmailIcon /> contact@globalgivers.org
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <IconButton aria-label="Facebook" color="inherit">
                            <FacebookIcon />
                        </IconButton>
                        <IconButton aria-label="Twitter" color="inherit">
                            <TwitterIcon />
                        </IconButton>
                        <IconButton aria-label="Instagram" color="inherit">
                            <InstagramIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <Link href="/" color="inherit">Home</Link><br />
                        <Link href="/about" color="inherit">About Us</Link><br />
                        <Link href="/contact" color="inherit">Contact</Link>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
