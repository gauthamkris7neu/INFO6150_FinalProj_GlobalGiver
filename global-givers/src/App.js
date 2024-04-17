import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Common/Navbar';  // Ensure paths are correctly cased
import Footer from './Components/Common/Footer';
import Home from './Pages/Home';                 // Lowercase 'p' in pages for consistency
import Events from './Pages/Events';
import Donations from './Pages/Donations';
import Profile from './Pages/Profile';
import EventDetails from './Components/Events/EventDetails'; // Ensure consistency in paths
import DonationForm from './Components/donations/DonationForm';
import DonationList from './Components/donations/DonationList';
import Login from './Components/auth/login';                  // Add Login and Register
import Register from './Components/auth/Register';
import ForgotPassword from './Components/auth/ForgotPassword'; // Assuming you have this

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/donations/form" element={<DonationForm />} />
        <Route path="/donations/list" element={<DonationList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;





