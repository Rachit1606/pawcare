package com.pawcare.backend.service;

import com.pawcare.backend.model.Booking;
import java.util.List;
import java.util.Optional;

public interface IBookingService {
    List<Booking> getAllBookings();
    Booking addBooking(Booking booking);
    Booking updateBooking(String id, Booking booking);
    void deleteBooking(String id);

    List<Booking> getBookingsByUserId(String userId);
    Optional<Booking> getBookingById(String id);
}

