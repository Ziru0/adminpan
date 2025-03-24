const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure emails are unique
    lowercase: true,
    trim: true,
  },
  firebaseId: {
    type: String,
    required: true,
    unique: true,  // Firebase ID should be unique
  },
  fullname: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['Passenger', 'Driver'],  // Role can either be Passenger or Driver
  },
  passengerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming passengerId might reference another user
  },
  coordinates: {
    type: [Number],  // For storing coordinates like [longitude, latitude]
    default: null,
  },
  profileImage: {
    type: String,
    default: '',  // Profile image can be an empty string if not set
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming driverId might reference another user (for passenger/driver relationship)
    default: null,
  },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

// Create the User model
const User = mongoose.model('User', userSchema, 'ziru');

// Export the model
module.exports = User;
