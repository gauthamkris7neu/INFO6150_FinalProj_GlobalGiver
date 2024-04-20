const Events = require('../models/events');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/users');

const JWT_SECRET = 'yourSecretKey';

const createEvent = async (req, res) => {

    console.log(req.body);
    const { eventName, description, address, city, state, dateTime, organizer,  donationNeeded, eventType, eventImage } = req.body;
    try {
        // Validation
        const validationErrors = userService.validateEvent(eventName, donationNeeded);
        if (Object.keys(validationErrors).length) {
            return res.status(400).json({ errors: validationErrors });
        };
        // check if the Event Date is in the past
        const currentDate = new Date();
        if (new Date(dateTime) < currentDate){
            return res.status(400).json({ message: 'Event date cannot be in the past' });
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
        const newEventDetails = { eventName, description, address, city, state, dateTime, organizer : organizerUser.fullName, donationNeeded, eventType, eventImage: req.file.path };
        const newEvent = new Events(newEventDetails);
        await newEvent.save(); 
        res.status(201).json({ message: 'Event created successfully' });
        
    } catch (error) {
        console.error("Error creating Event:", error);
        res.status(500).json({ message: 'Error creating Event', error: error.message });
    };
};

const getAllEvents = async (req, res) => {
    const { email } = req.query;
    try {
        // Assuming 'Events' is the Mongoose model for events
        const eventOrganizer = await Users.findOne({ email });
        const currentDate = new Date();
        if (!eventOrganizer) {
            return res.status(400).json({ message: "You are not an Organizer" });
        }

        // Organizer found, now retrieve events for this organizer
        const events = await Events.find({ organizer: eventOrganizer.fullName, dateTime: { $gt: currentDate }  });

        // Send events back to the client
        res.status(200).json({ events });
        
    } catch (error) {
        console.error("Error retrieving events:", error);
        res.status(500).json({ message: 'Error retrieving events', error: error.message });
    }
};

const editEvent = async (req, res) => {
    const { eventName } = req.body;
    const updates = req.body; // Fields to update

    try {
        // Assuming 'Events' is the Mongoose model for events
        const existingEvent = await Events.findOne({ eventName });

        if (!existingEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Update only the provided fields
        Object.keys(updates).forEach(key => {
            if (updates[key] !== undefined) {
                existingEvent[key] = updates[key];
            }
        });

        // Save the updated event
        await existingEvent.save();

        res.status(200).json({ message: "Event updated successfully", updatedEvent: existingEvent });
        
    } catch (error) {
        console.error("Error editing event:", error);
        res.status(500).json({ message: 'Error editing event', error: error.message });
    }
};

const closeEvent = async (req, res) => {
    try {
        // Get the current date
        const currentDate = new Date();

        // Find events with dates in the past
        const pastEvents = await Events.find({ dateTime: { $lt: currentDate } });

        // Delete past events
        await Events.deleteMany({ _id: { $in: pastEvents.map(event => event._id) } });

        res.status(200).json({ message: "Past events deleted successfully" });
    } catch (error) {
        console.error("Error closing events:", error);
        res.status(500).json({ message: 'Error closing events', error: error.message });
    }
};

module.exports = {
    createEvent,
    editEvent,
    getAllEvents,
    closeEvent
};