import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper, Grid } from '@mui/material';
import { useBookings } from './BookingContext';

const BookAppointment = ({ title, service, titleColor }) => {
  const { addBooking } = useBookings();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    const email = localStorage.getItem("userEmail"); // Retrieve the email from local storage
    if (email) {
      setForm((prevForm) => ({ ...prevForm, email })); // Set email in form state
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBooking({ ...form, service });
    navigate('/my-bookings');
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 4, color: titleColor }}>
          {title}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                name="email"
                value={form.email}
                InputProps={{
                  readOnly: true, // Make the email field read-only
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Location"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Time"
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
          </Grid>
          <Box textAlign="center" mt={4}>
            <Button variant="contained" color="primary" type="submit" sx={{ padding: '10px 20px', fontSize: '16px', fontWeight: 'bold' }}>
              Book Appointment
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default BookAppointment;
