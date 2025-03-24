const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverInfoSchema = new Schema({
  firebaseId: {
    type: String,
    required: true
  },
  cabnumber: {
    type: String,
    required: true
  },
  cabcolor: {
    type: String,
    required: true
  },
  cabbrand: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Reference to the User model
  }
}, { timestamps: true });

// Export the model
module.exports = mongoose.model('DriverInfo', driverInfoSchema, 'drivers-info');
