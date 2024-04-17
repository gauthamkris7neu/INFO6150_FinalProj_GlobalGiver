// auth.js
const API_BASE_URL = 'https://api.yourdomain.com';
 
// Helper function to fetch data with authorization token
const fetchWithAuth = async (url, options = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT for auth
    };
 
    const response = await fetch(`${API_BASE_URL}${url}`, { ...options, headers });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
 
export const login = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    if (!response.ok) {
        throw new Error('Login failed');
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
};
 
export const logout = () => {
    localStorage.removeItem('token');
};
 
export const registerUser = async (userData) => {
    return fetchWithAuth('/auth/register/user', {
        method: 'POST',
        body: JSON.stringify(userData)
    });
};
 
export const registerOrganization = async (orgData, certificateFile) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(orgData));
    formData.append('certificate', certificateFile);
 
    const response = await fetch(`${API_BASE_URL}/auth/register/organization`, {
        method: 'POST',
        body: formData
    });
    if (!response.ok) {
        throw new Error('Organization registration failed');
    }
    return response.json();
};