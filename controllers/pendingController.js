// pendingController.js
const mongoose = require('mongoose');
const PendingDriver= require('../models/pendingdrivermodel');
const User = require('../models/userModel'); // Make sure the path to your User model is correct

// Get all driver info records
const getAllPendingDriver = async (req, res) => {
    try {
        const drivers = await PendingDriver.find();
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single driver info by ID
const getPendingDriverById = async (req, res) => {
    try {
        const infoId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(infoId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const info = await PendingDriver.findById(infoId);

        if (!info) {
            return res.status(404).json({ message: 'Driver info not found' });
        }

        res.status(200).json(info);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a driver info by ID (for decline)
const deletePendingDriver = async (req, res) => {
    try {
        const info = await PendingDriver.findByIdAndDelete(req.params.id);

        if (!info) {
            return res.status(404).json({ message: 'Driver info not found' });
        }

        res.status(200).json({ message: 'Driver info deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Approve driver and move to users collection
const approveDriver = async (req, res) => {
    try {
        const { driverId } = req.params;

        // Find driver in pending drivers
        const driver = await PendingDriver.findById(driverId);
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        // Create new user entry
        const newUser = new User({
            fullname: driver.fullname,
            number: driver.number,
            address: driver.address,
            cabnumber: driver.cabnumber,
            cabcolor: driver.cabcolor,
            cabbrand: driver.cabbrand,
            status: 'approved',
            role: 'driver'
        });

        await newUser.save(); // Save driver to users collection
        await PendingDriver.findByIdAndDelete(driverId); // Remove from pending drivers

        res.json({ message: 'Driver approved successfully and moved to user table' });
    } catch (error) {
        console.error('Error approving driver:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllPendingDriver = getAllPendingDriver;
exports.getPendingDriverById = getPendingDriverById;
exports.deletePendingDriver = deletePendingDriver;
exports.approveDriver = approveDriver;

const pendingDriverController = {
    getAllPendingDriver,
    getPendingDriverById,
    deletePendingDriver,
    approveDriver,
};

module.exports = pendingDriverController;