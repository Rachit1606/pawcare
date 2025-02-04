package com.pawcare.backend.service.impl;

import com.pawcare.backend.model.Booking;
import com.pawcare.backend.repository.BookingRepository;
import com.pawcare.backend.service.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService implements IBookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking addBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Override
    public Booking updateBooking(String id, Booking booking) {
        Optional<Booking> existingBookingOpt = bookingRepository.findById(id);
        if (existingBookingOpt.isPresent()) {
            Booking existingBooking = existingBookingOpt.get();
            if (booking.getFirstName() != null) {
                existingBooking.setFirstName(booking.getFirstName());
            }
            if (booking.getLastName() != null) {
                existingBooking.setLastName(booking.getLastName());
            }
            if (booking.getEmail() != null) {
                existingBooking.setEmail(booking.getEmail());
            }
            if (booking.getLocation() != null) {
                existingBooking.setLocation(booking.getLocation());
            }
            if (booking.getDate() != null) {
                existingBooking.setDate(booking.getDate());
            }
            if (booking.getTime() != null) {
                existingBooking.setTime(booking.getTime());
            }
            if (booking.getService() != null) {
                existingBooking.setService(booking.getService());
            }
            if (booking.getUserId() != null) {
                existingBooking.setUserId(booking.getUserId());
            }
            return bookingRepository.save(existingBooking);
        }
        return null;
    }

    @Override
    public void deleteBooking(String id) {
        bookingRepository.deleteById(id);
    }

    @Override
    public List<Booking> getBookingsByUserId(String userId) {
        return bookingRepository.findByUserId(userId);
    }

    @Override
    public Optional<Booking> getBookingById(String id) {
        return bookingRepository.findById(id);
    }
}
