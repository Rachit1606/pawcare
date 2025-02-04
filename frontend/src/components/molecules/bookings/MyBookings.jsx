import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, Modal, TextField, Card, CardContent, CardActions, Grid, Avatar, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    date: '',
    time: ''
  });
  const [userEmail, setUserEmail] = useState("");
  const [isBookingTypeModalOpen, setIsBookingTypeModalOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
      fetchUserBookings(email);
    }
  }, []);

  const fetchUserBookings = async (email) => {
    try {
      const response = await axios.get('https://pawcarebackend.onrender.com/api/bookings');
      const userBookings = response.data.filter(booking => booking.email === email);
      setBookings(userBookings);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setEditForm({ ...booking });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://pawcarebackend.onrender.com/api/bookings/${id}`);
      setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSave = async () => {
    if (!selectedBooking || !selectedBooking.id) {
      console.error("Selected booking ID is missing");
      return;
    }

    try {
      const response = await axios.put(`https://pawcarebackend.onrender.com/api/bookings/${selectedBooking.id}`, editForm);
      setBookings(prevBookings => 
        prevBookings.map(booking => booking.id === selectedBooking.id ? response.data : booking)
      );
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const openBookingTypeModal = () => {
    setIsBookingTypeModalOpen(true);
  };

  const closeBookingTypeModal = () => {
    setIsBookingTypeModalOpen(false);
  };

  const handleBookingTypeSelect = (type) => {
    closeBookingTypeModal();
    navigate(`/book-${type}`);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
        <Typography variant="h4" component="h1" sx={{ color: '#3f51b5', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
          My Bookings
        </Typography>
        <Button 
          variant="contained" 
          sx={{ backgroundColor: '#ff8a65', color: '#fff' }} 
          startIcon={<AddIcon />} 
          onClick={openBookingTypeModal}
        >
          Create Booking
        </Button>
      </Box>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 4, display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ backgroundColor: '#3f51b5', marginRight: 2 }}>
          {userEmail.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" sx={{ color: '#757575', fontFamily: 'Roboto, sans-serif' }}>
            Logged in as:
          </Typography>
          <Typography variant="body1" sx={{ color: '#3f51b5', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
            {userData?.displayName ? userData?.displayName : (userData?.username || userData?.email)}
          </Typography>
        </Box>
      </Paper>
      <Grid container spacing={3}>
        {bookings.map((booking) => (
          <Grid item xs={12} sm={6} md={4} key={booking.id}>
            <Card elevation={3} sx={{ minWidth: 275, backgroundColor: '#f9f1e7', padding: 2, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#800000', fontWeight: 'bold', mb: 2 }}>{booking.service} Appointment</Typography>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar alt={booking.firstName} src="/static/images/avatar/1.jpg" sx={{ width: 56, height: 56, marginRight: 2, backgroundColor: '#e0e0e0', color: '#000' }} />
                  <Box>
                    <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>{booking.firstName} {booking.lastName}</Typography>
                    <Typography variant="body2" sx={{ color: '#666', fontFamily: 'Roboto, sans-serif' }}>{booking.email}</Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <CalendarTodayIcon sx={{ marginRight: 1, color: '#800000' }} />
                  <Typography variant="body2" sx={{ fontFamily: 'Roboto, sans-serif', color: '#3f51b5' }}>
                    Date: 
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'Roboto, sans-serif', color: '#3f51b5', fontWeight: 600, marginLeft: 0.5 }}>
                    {booking.date}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <LocationOnIcon sx={{ marginRight: 1, color: '#800000' }} />
                  <Typography variant="body2" sx={{ fontFamily: 'Roboto, sans-serif', color: '#3f51b5' }}>
                    Location: 
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'Roboto, sans-serif', color: '#3f51b5', fontWeight: 800, marginLeft: 0.5 }}>
                    {booking.location}
                  </Typography>
                </Box>
              
              </CardContent>
              <CardActions sx={{ padding: '8px 16px', marginTop: 0 }}>
                <Button 
                  sx={{ color: '#1976d2', textTransform: 'none', fontWeight: 'bold', marginRight: 1 }} 
                  startIcon={<EditIcon />}
                  onClick={() => handleEdit(booking)}
                >
                  Edit
                </Button>
                <Button 
                  sx={{ color: '#d32f2f', textTransform: 'none', fontWeight: 'bold' }} 
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(booking.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
      >
        <Box p={4} bgcolor="background.paper" mx="auto" my="10%" width="400px" borderRadius="8px" boxShadow={24}>
          <Typography variant="h6" align="center" gutterBottom sx={{ color: '#3f51b5', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
            Edit Booking
          </Typography>
          <form>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                fullWidth
                margin="normal"
                label="First Name"
                name="firstName"
                value={editForm.firstName}
                onChange={handleChange}
                required
                sx={{ backgroundColor: '#e8f5e9', borderRadius: '4px', fontSize: '1rem', fontFamily: 'Roboto, sans-serif' }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                value={editForm.email}
                onChange={handleChange}
                required
                sx={{ backgroundColor: '#e3f2fd', borderRadius: '4px', fontSize: '1rem', fontFamily: 'Roboto, sans-serif' }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Location"
                name="location"
                value={editForm.location}
                onChange={handleChange}
                required
                sx={{ backgroundColor: '#fff3e0', borderRadius: '4px', fontSize: '1rem', fontFamily: 'Roboto, sans-serif' }}
              />
              <Box display="flex" justifyContent="space-between">
                <TextField
                  margin="normal"
                  label="Date"
                  name="date"
                  type="date"
                  value={editForm.date}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  sx={{ backgroundColor: '#fce4ec', borderRadius: '4px', fontSize: '1rem', fontFamily: 'Roboto, sans-serif' }}
                />
                <TextField
                  margin="normal"
                  label="Time"
                  name="time"
                  type="time"
                  value={editForm.time}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  sx={{ backgroundColor: '#f3e5f5', borderRadius: '4px' }}
                />
              </Box>
            </Box>
            <Box textAlign="center" mt={2}>
              <Button variant="contained" sx={{ backgroundColor: '#4caf50', color: '#fff' }} onClick={handleSave}>
                Save Changes
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <Modal
        open={isBookingTypeModalOpen}
        onClose={closeBookingTypeModal}
      >
        <Box p={4} bgcolor="background.paper" mx="auto" my="10%" width="400px" borderRadius="8px" boxShadow={24}>
          <Typography variant="h6" align="center" gutterBottom sx={{ color: '#3f51b5', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
            Select Booking Type
          </Typography>
          <Box textAlign="center" mt={2}>
            <Button variant="contained" sx={{ backgroundColor: '#ffb74d', color: '#fff', margin: '8px' }} onClick={() => handleBookingTypeSelect('walking')}>
              Walking
            </Button>
            <Button variant="contained" sx={{ backgroundColor: '#ffb74d', color: '#fff', margin: '8px' }} onClick={() => handleBookingTypeSelect('grooming')}>
              Grooming
            </Button>
            <Button variant="contained" sx={{ backgroundColor: '#ffb74d', color: '#fff', margin: '8px' }} onClick={() => handleBookingTypeSelect('trainer')}>
              Trainer
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default MyBookings;
