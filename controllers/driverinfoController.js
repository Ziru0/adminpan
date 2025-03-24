const mongoose = require('mongoose'); // Import mongoose
const DriverInfo = require('../models/driverinfomodel'); // Use the correct model name

// Get all driver info records
const getAllDriverInfo = async (req, res) => {
  try {
    const driverInfos = await DriverInfo.find(); // Fetch all driver info records
    res.status(200).json(driverInfos); // Return data as JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single driver info by ID
const getDriverInfoById = async (req, res) => {
  try {
    const infoId = req.params._id; // Use :id in the route

    if (!mongoose.Types.ObjectId.isValid(infoId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const info = await DriverInfo.findById(infoId); // Use findById for MongoDB ObjectID

    if (!info) {
      return res.status(404).json({ message: 'Driver info not found' });
    }

    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a driver info by ID
const deleteDriverInfo = async (req, res) => {
  try {
    const info = await DriverInfo.findByIdAndDelete(req.params.id);

    if (!info) {
      return res.status(404).json({ message: 'Driver info not found' });
    }

    res.status(200).json({ message: 'Driver info deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllDriverInfo,
  getDriverInfoById,
  deleteDriverInfo,
};
