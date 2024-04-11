import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrganizationsList = () => {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrganizations();
    }, []);

    const fetchOrganizations = async () => {
        setLoading(true);
        try {
            // Replace '/api/organizations' with your actual API endpoint to fetch organizations
            const response = await axios.get('/api/organizations');
            setOrganizations(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching organizations:', error);
            setError('Failed to load organizations.');
            setLoading(false);
        }
    };

    if (loading) return <div>Loading organizations...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Organizations List</h2>
            {organizations.length > 0 ? (
                <ul>
                    {organizations.map((org) => (
                        <li key={org._id}>
                            <h3>{org.name}</h3>
                            <p>{org.description}</p>
                            {/* You can add more details or actions for each organization */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No organizations found.</p>
            )}
        </div>
    );
};

export default OrganizationsList;
