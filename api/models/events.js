const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  organizer: {
    type: String,
    required: true
  },
  rsvp: [{
    type: mongoose.Schema.Types.ObjectId,
  }],
  donationNeeded: {
    type: Number,
    required: true,
  },
  donationReceived: {
    type: Number,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
    enum: ['charity', 'volunteer', 'awareness']
  },
  eventImage: {
    type: String,
    default: '',
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
