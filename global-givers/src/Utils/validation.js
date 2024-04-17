// validation.js
export const validateUserRegistration = (userData) => {
    const errors = {};
    if (!userData.email.includes('@')) {
        errors.email = 'Invalid email format.';
    }
    if (userData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long.';
    }
    return errors;
};
 
export const validateOrganizationRegistration = (orgData, certificateFile) => {
    const errors = {};
    if (!orgData.name) {
        errors.name = 'Organization name is required.';
    }
    if (!orgData.email || !orgData.email.includes('@')) {
        errors.email = 'Invalid email format.';
    }
    if (!certificateFile) {
        errors.certificate = 'Verification certificate is required.';
    }
    return errors;
};