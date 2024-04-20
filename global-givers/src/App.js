import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Common/Navbar';  // Ensure paths are correctly cased
import Footer from './Components/Common/Footer';
import Home from './Pages/Home';                 // Lowercase 'p' in pages for consistency
import Events from './Pages/Events';
import Donations from './Pages/Donations';
import Profile from './Pages/Profile';
import AdminPage from './Components/admin/Admin';
import EventDetails from './Components/Events/EventDetails'; // Ensure consistency in paths
import { Box } from '@mui/material';
import DonationForm from './Components/donations/DonationForm';
import DonationList from './Components/donations/DonationList';
import Login from './Components/auth/login';                  // Add Login and Register
import Register from './Components/auth/Register';
import ForgotPassword from './Components/auth/ForgotPassword';
import CreateEventPage from './Components/organization/CreateEvent'; // Assuming you have this
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './actions/loginActions';


const App = () => {
  const dispatch = useDispatch();
  const { loggedIn, user } = useSelector(state => state.login);
  const userType = user ? user.userType : null;
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <Navbar isLoggedIn={loggedIn} userType={userType} handleLogout={handleLogout} />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box component="main" flexGrow={1}>
          {loggedIn &&
            <>
              {userType === 'organization' &&
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/createEvents" element={loggedIn ? <CreateEventPage/> : <Navigate replace to="/login" />} />
                <Route path="/profile" element={loggedIn ? <Profile /> : <Navigate replace to="/login" />} />
                <Route path="*" element={<Navigate to={loggedIn ? "/" : "/login"} />} />
              </Routes>
              }
              {userType === 'donor' &&
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/events" element={loggedIn ? <Events /> : <Navigate replace to="/login" />} />
                  <Route path="/profile" element={loggedIn ? <Profile /> : <Navigate replace to="/login" />} />
                  <Route path="*" element={<Navigate to={loggedIn ? "/" : "/login"} />} />
                </Routes>
              }
              {userType === 'admin' &&
                <Routes>
                <Route path="/" element={loggedIn ? <AdminPage /> : <Navigate replace to="/login" />} />
                <Route path="*" element={<Navigate to={loggedIn ? "/" : "/login"} />} />
              </Routes>
              }
            </>
          }
          {
            !loggedIn &&
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="*" element={<Navigate to={loggedIn ? "/" : "/login"} />} />
            </Routes>
          }
        </Box>
        <Footer />
      </Box>

    </Router>
  );
};

export default App;





