const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  passengerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Reference to the User model (Passenger)
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model (Driver)
  },
  fullname: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  coordinates: {
    start: {
      longitude: {
        type: Number,
        required: true
      },
      latitude: {
        type: Number,
        required: true
      }
    },
    end: {
      longitude: {
        type: Number,
        required: true
      },
      latitude: {
        type: Number,
        required: true
      }
    }
  },
  distance: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'completed', 'failed'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema, 'requests');
