const Events = require('../models/events');
const Users = require('../models/users');
const mongoose = require('mongoose');

const registerUserForEvent = async (req, res) => {
    const { eventId, email } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const event = await Events.findById(eventId);
        if (!event) {
        return res.status(404).send("Event not found");
        }
        const isAlreadyRegistered = event.rsvp.includes(user._id);
        if (isAlreadyRegistered) {
        return res.status(400).send("You are already registered for this event.");
        }
        event.rsvp.push(user._id);
        await event.save();
        await Users.findByIdAndUpdate(user._id, {
        $addToSet: { registeredEvents: eventId }
        });
        res.status(200).json({ message: 'User registered for event successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user for event', error: error.message });
    }
};

const unregisterUserForEvent = async (req, res) => {
    const { eventId, email } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const event = await Events.findById(eventId);
        if (!event) {
        return res.status(404).send("Event not found");
        }
        const isAlreadyRegistered = event.rsvp.includes(user._id);
        if (!isAlreadyRegistered) {
        return res.status(400).send("You have not registered for this event.");
        }
        await Events.findByIdAndUpdate(eventId, {
            $pull: { rsvp: userId }
        });
        
        await Users.findByIdAndUpdate(userId, {
            $pull: { registeredEvents: eventId }
        });
        res.status(200).send("Unregistered successfully");
    } catch (error) {}
}

const getRegisteredEvents = async (req, res) => {
    const { email } = req.body;
    try {
        // Fetch the user with the list of registered events
        const user = await Users.findOne({ email }).populate('registeredEvents');
        if (!user) {
          return res.status(404).send("User not found");
        }
        res.status(200).json(user.registeredEvents);
      } catch (error) {
        res.status(500).send("Error fetching registered events: " + error.message);
      }
};

const userDonation = async (req, res) => {
    const { eventId, email, amount } = req.body;
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).send("Invalid event ID format");
    }
    if (amount <= 0) {
        return res.status(400).send("Invalid donation amount");
    }
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const event = await Events.findById(eventId);
        if (!event) {
          return res.status(404).send("Event not found");
        }
        event.donationReceived += +amount;
        await event.save();
        res.status(200).send("Donation successful. Thank you!");
    } catch (error) {
        res.status(500).send("Error processing your donation: " + error.message);
    } 
};

module.exports = {
    registerUserForEvent,
    unregisterUserForEvent,
    getRegisteredEvents,
    userDonation
};