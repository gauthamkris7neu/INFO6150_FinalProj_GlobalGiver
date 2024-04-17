const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ['donor', 'organization', 'admin' ],
  },
  fileInfo: {
    type: String,
    default: "",
    validate: {
      validator: function(value) {
        return this.userType !== 'organization' || (this.userType === 'organization' && value.trim() !== "");
      },
      message: 'File information is required for organization users',
    },
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);