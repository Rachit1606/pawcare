import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';
import dogImage from './dogImage.png';  

const ContactUs = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    description: '',  // Add description field to state
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.email || !form.phoneNumber || !form.description) {
      setError('All fields are required.');
      return;
    }

    try {
      const contactUsEndpoint = `${import.meta.env.VITE_BACKEND_URL}/api/contactus/submit`;
      const response = await axios.post(contactUsEndpoint, form);
      console.log('Form data submitted:', response.data);
      setSuccessMessage('Form submitted successfully! We will get back to you shortly.');
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        description: '',  // Reset description field
      });
    } catch (error) {
      console.error('Error submitting form data:', error);
      setError('An error occurred while submitting the form. Please try again.');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100%', padding: 2 }}>
      <Paper elevation={3} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'stretch', borderRadius: '10px', overflow: 'hidden', maxWidth: '900px', width: '100%' }}>
        <Box sx={{ flex: 1, padding: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5', textAlign: 'center' }}>
            Chat to our team
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ textAlign: 'center' }}>
            Need help with something? Want a demo? Get in touch with our friendly team and we’ll get in touch within 2 hours.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Work Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Phone Number"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
            {error && <Typography color="error" sx={{ textAlign: 'center', mt: 2 }}>{error}</Typography>}
            {successMessage && <Typography color="success" sx={{ textAlign: 'center', mt: 2 }}>{successMessage}</Typography>}
            <Box textAlign="center" mt={4}>
              <Button variant="contained" color="primary" type="submit" sx={{ padding: '10px 20px', fontSize: '16px', fontWeight: 'bold' }}>
                Get in touch
              </Button>
            </Box>
          </form>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 'auto' }}>
          <img src={dogImage} alt="Dog" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
      </Paper>
    </Box>
  );
};

export default ContactUs;
