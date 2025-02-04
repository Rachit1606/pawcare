import React from 'react';
import Navbar from '../components/navbar';
import Profile from '../components/molecules/userProfile/userProfile';
import AboutUs from '../components/molecules/aboutUs/aboutUs';
import ContactUs from '../components/molecules/contactUs/contactUs';
import Login from "../components/molecules/auth/Login";
import Register from "../components/molecules/auth/Register";
import Reset from "../components/molecules/auth/Reset";
import BookWalkingAppointment from '../components/molecules/bookings/BookWalkingAppointment';
import BookTrainerAppointment from '../components/molecules/bookings/BookTrainerAppointment';
import BookGroomingAppointment from '../components/molecules/bookings/BookGroomingAppointment';
import MyBookings from '../components/molecules/bookings/MyBookings';
import { BookingProvider } from '../components/molecules/bookings/BookingContext';
import BrandPartner from '../components/molecules/brandPartners/brandPartners';
import PaymentStatus from '../components/molecules/paymentStatus';
import ProductListings from '../components/molecules/shop/ProductListing'
import CartProvider from '../components/context/CartContext'
import Cart from '../components/molecules/shop/Cart'
import OrderHistory from '../components/molecules/shop/OrderHistory'
import Chat from '../components/molecules/chatbot/Chat';
import Share from '../components/Share';
import AnalyticsPage from '../AnalyticsPage';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BookingProvider>
      <CartProvider>
        <Router>
          <div>
            <Navbar />
            <Chat />
            <Share />
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route exact path="/register" element={<Register />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route exact path="/" element={<Login />} />
              <Route exact path="/reset" element={<Reset />} />
              <Route path="/book-walking" element={<BookWalkingAppointment />} />
              <Route path="/book-trainer" element={<BookTrainerAppointment />} />
              <Route path="/book-grooming" element={<BookGroomingAppointment />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/payment-success" element={<PaymentStatus status="success" />} />
              <Route path="/payment-failure" element={<PaymentStatus status="failure" />} />
              <Route path="/brandPartners" element={<BrandPartner />} />
              <Route path="/shop">
                <Route path="products" element={<ProductListings />} />
                <Route path="cart" element={<Cart />} />
              </Route>
              {/* <Route path="/chat" element={<Chat />} /> */}

              <Route path="/analytics" element={<AnalyticsPage/>} />

            </Routes>
          </div>
        </Router>
      </CartProvider>
    </BookingProvider>
  );
}

export default App;
