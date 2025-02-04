import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const BookingContext = createContext();

export const useBookings = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch initial bookings from API
    const fetchBookings = async () => {
      try {
        const response = await axios.get('https://pawcarebackend.onrender.com/api/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  const addBooking = async (booking) => {
    try {
      const response = await axios.post('https://pawcarebackend.onrender.com/api/bookings', booking);
      setBookings((prevBookings) => [...prevBookings, response.data]);
    } catch (error) {
      console.error('Failed to add booking:', error);
    }
  };

  const updateBooking = async (id, updatedBooking) => {
    try {
      const response = await axios.put(`https://pawcarebackend.onrender.com/api/bookings/${id}`, updatedBooking);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? response.data : booking
        )
      );
    } catch (error) {
      console.error('Failed to update booking:', error);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await axios.delete(`https://pawcarebackend.onrender.com/api/bookings/${id}`);
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== id)
      );
    } catch (error) {
      console.error('Failed to delete booking:', error);
    }
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, updateBooking, deleteBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
