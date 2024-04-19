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
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true,
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
    ref: 'User'
  }],
  donationNeeded: {
    type: Number,
    required: true,
  },
  donationReceived: {
    type: Number,
    default: 0
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
