const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const fullNameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const eventNameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const donationRegex = /^\d+(\.\d{1,2})?$/;


const validateInput = (email, fullName, password) => {
    const validationErrors = {};
    if (!emailRegex.test(email) && email) {
        validationErrors.email = 'Invalid email format';
    }
    if (!fullNameRegex.test(fullName) && fullName) {
        validationErrors.fullName = 'Full name can only contain letters, spaces, apostrophes, hyphens, and periods';
    }
    if (!passwordRegex.test(password) && password) {
        validationErrors.password = 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number';
    }
    return validationErrors;
}

const validateEvent = (eventName, donation) => {
    const validationErrors = {};
    if (!eventNameRegex.test(eventName)) {
        validationErrors.eventName = 'Invalid Event Name format';
    }
    if (!donationRegex.test(donation)) {
        validationErrors.donation = 'Donation Amount can only contain numbers';
    }
    return validationErrors;
}

module.exports = {
    validateInput,
    validateEvent
};