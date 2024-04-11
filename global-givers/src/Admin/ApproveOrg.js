import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApproveOrg = () => {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrganizations();
    }, []);

    const fetchOrganizations = async () => {
        try {
            // Replace with your actual API endpoint to fetch organizations pending approval
            const response = await axios.get('/api/organizations/pending');
            setOrganizations(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching organizations:', error);
            setLoading(false);
        }
    };

    const approveOrganization = async (orgId) => {
        try {
            // Replace with your actual API endpoint to approve an organization
            await axios.post(`/api/organizations/approve/${orgId}`);
            // Fetch the updated list of organizations
            fetchOrganizations();
        } catch (error) {
            console.error('Error approving organization:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Approve Organizations</h2>
            {organizations.length > 0 ? (
                <ul>
                    {organizations.map(org => (
                        <li key={org._id}>
                            {org.name} - <button onClick={() => approveOrganization(org._id)}>Approve</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No organizations pending approval.</p>
            )}
        </div>
    );
};

export default ApproveOrg;
