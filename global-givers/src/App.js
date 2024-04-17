import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Common/Navbar';
import Home from './Pages/Home';
import Events from './Pages/Events';
import Donations from './Pages/Donations';
import Profile from './Pages/Profile';
import EventDetails from './Components/Events/EventDetails';
import DonationForm from './Components/donations/DonationForm';
import DonationList from './Components/donations/DonationList';
 
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
</Routes>
</Router>
  );
};

export default App;
