import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// Import your components
import Login from './landingpage/login';
import Register from './landingpage/register';
import UserDashboard from './user/UserDashboard';
import OrgDashboard from './organization/OrgDashboard';
import EditProfile from './user/EditProfile';
import PostEvent from './organization/PostEvent';
import EventsList from './user/EventsList';
import OrganizationsList from './user/OrganizationsList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/register" element={<Register />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/org-dashboard" element={<OrgDashboard />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/post-event" element={<PostEvent />} />
          <Route path="/events-list" element={<EventsList />} />
          <Route path="/organizations-list" element={<OrganizationsList />} />
          {/* Add additional routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
