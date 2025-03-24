const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 
const requestController = require('../controllers/requestController'); 
const driverinfoController = require('../controllers/driverinfoController'); 
const pendingController = require('../controllers/pendingController'); 


const User = require('../models/userModel'); // Import the User model

// Fetch and render userlist.ejs with user data
router.get('/userlist', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from MongoDB
        res.render('userlist', { users }); // Pass users to EJS template
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

// Route to approve a pending driver
router.post('/pendingdrivers/:driverId/approve', pendingController.approveDriver); // Use POST for actions that modify data

// Other existing routes
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);


router.get('/pendingdrivers', pendingController.getAllPendingDriver);
router.get('/pendingdrivers/:id', pendingController.getPendingDriverById);

router.get('/requestlist', requestController.getAllrequests);
router.get('/requestlist/:id', requestController.getUserById);

router.get('/driverinfo', driverinfoController.getAllDriverInfo);
router.get('/driverinfo/:id', driverinfoController.getDriverInfoById);

module.exports = router;
