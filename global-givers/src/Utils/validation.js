const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const fullNameRegex = /^(?=.{3,}$)[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const eventNameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const donationRegex = /^\d+(\.\d{1,2})?$/;


export const validateUserRegistration = (userData) => {
    const errors = {};
    if (!emailRegex.test(userData.email) && userData.email) {
        errors.email = 'Invalid email format.';
    }
    if (!fullNameRegex.test(userData.fullName) && userData.fullName) {
        errors.fullName = 'Full name can only contain letters, spaces, apostrophes, hyphens, and periods and must be 3 characters long';
    }
    if (!passwordRegex.test(userData.password) && userData.password) {
        errors.password = 'Password must be at least 8 characters long and should have Upper case, Lower case, Special character and integers.';
    }
    return errors;
};
 
export const validateOrganizationRegistration = (orgData, certificateFile) => {
    const errors = {};
    if (!emailRegex.test(orgData.email) && orgData.email) {
        errors.email = 'Invalid email format.';
    }
    if (!fullNameRegex.test(orgData.fullName) && orgData.fullName) {
        errors.fullName = 'Full name can only contain letters, spaces, apostrophes, hyphens, and periods and must be 3 characters long';
    }
    if (!passwordRegex.test(orgData.password) && orgData.password) {
        errors.password = 'Password must be at least 8 characters long and should have Upper case, Lower case, Special character and integers.';
    }
    if (!fullNameRegex.test(orgData.name) && orgData.name) {
        errors.name = 'Organization name is required.';
    }
    if (!certificateFile) {
        errors.certificate = 'Verification certificate is required.';
    }
    return errors;
};