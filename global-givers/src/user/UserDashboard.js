import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const navigate = useNavigate();

    // Function to navigate to the events list page
    const goToEventsList = () => {
        navigate('/events-list');
    };

    // Function to navigate to the organizations list page
    const goToOrganizationsList = () => {
        navigate('/organizations-list');
    };

    // Function to navigate to the edit profile page
    const goToEditProfile = () => {
        navigate('/edit-profile');
    };

    return (
        <div>
            <h2>User Dashboard</h2>
            <p>Welcome to your Dashboard!</p>
            <div>
                <button onClick={goToEventsList}>View Events</button>
                <button onClick={goToOrganizationsList}>Explore Organizations</button>
                <button onClick={goToEditProfile}>Edit Profile</button>
                {/* Add more buttons or links for additional user actions as needed */}
            </div>
        </div>
    );
};

export default UserDashboard;
