const Events = require('../models/events');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/users');

const JWT_SECRET = 'yourSecretKey';

const createEvent = async (req, res) => {

    console.log(req.body);
    const { eventName, description, location, dateTime, organizer,  donationNeeded, eventType, eventImage } = req.body;
    try {
        // Validation
        const validationErrors = userService.validateEvent(eventName, donationNeeded);
        if (Object.keys(validationErrors).length) {
            return res.status(400).json({ errors: validationErrors });
        };
        // Check if organizer is an organization
        const organizerUser = await Users.findOne({ email: organizer });
        if (!organizerUser || organizerUser.userType !== 'organization') {
            return res.status(400).json({ message: 'Organizer is not an organization' });
        }

        // Check if the event name already exists
        const existingEvent = await Events.findOne({ eventName });
        if (existingEvent) {
            return res.status(400).json({ message: 'Event Name already exists' });
        }

        // Creating new event
        const newEventDetails = { eventName, description, location, dateTime, organizer : organizerUser.fullName, donationNeeded, eventType, eventImage: req.file.path };

        const newEvent = new Events(newEventDetails);
        await newEvent.save(); 
        res.status(201).json({ message: 'Event created successfully' });
        
    } catch (error) {
        console.error("Error creating Event:", error);
        res.status(500).json({ message: 'Error creating Event', error: error.message });
    };
};

const getAllEvents = async (req, res) => {
    const {organizer} = req.body;
    try {
        // Assuming 'Events' is the Mongoose model for events
        const eventOrganizer = await Events.findOne({ organizer});
        if(!eventOrganizer){
            res.status().json({message: "You are not an Organizer"})
        }
        else{
            const events = await Events.find();
        }
    }catch(error){
        res.status(500).json({message: 'Error Retreiving users', error: error.message});

    }
};

const editEvent = async (req, res) => {
    
};
const closeEvent = async(req, res) => {
    
};
module.exports = {
    createEvent,
    editEvent,
    getAllEvents,
    closeEvent
};