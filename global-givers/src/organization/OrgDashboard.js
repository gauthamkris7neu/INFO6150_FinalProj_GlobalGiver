import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const OrgDashboard = () => {
    const navigate = useNavigate(); // Use useNavigate here

    // Function to navigate to the post event page
    const goToPostEvent = () => {
        navigate('/post-event'); // Updated to use navigate
    };

    // Function to navigate to the edit profile page
    const goToEditProfile = () => {
        navigate('/edit-profile'); // Updated to use navigate
    };

    return (
        <div>
            <h2>Organization Dashboard</h2>
            <p>Welcome to your Dashboard!</p>
            <div>
                <button onClick={goToPostEvent}>Post an Event</button>
                <button onClick={goToEditProfile}>Edit Profile</button>
            </div>
        </div>
    );
};

export default OrgDashboard;
