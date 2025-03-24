const mongoose = require('mongoose');

const pendingDriverSchema = new mongoose.Schema({
   firebaseId: { type: String, required: true, unique: true },
   email: { type: String, required: true, unique: true },
   fullname: { type: String, required: true },
   number: { type: String, required: true },
   address: { type: String, required: true },
   cabnumber: { type: String, default: '' },
   cabcolor: { type: String, default: '' },
   cabbrand: { type: String, default: '' },
   status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const PendingDriver = mongoose.model('PendingDriver', pendingDriverSchema, 'pending-driver');
module.exports = PendingDriver;
