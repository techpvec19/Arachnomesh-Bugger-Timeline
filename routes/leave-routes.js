// This is 'leave-routes.js' - A File containing all routes for the Leave entity

// Importing Requirements
const express = require('express');
const router = express.Router();

// Importing Leave Controller
const leaveController = require('../controllers/leave-controller')

// Leave Routes
router.post('/addLeave', leaveController.addNewLeave);
router.put('/allLeaves/:id', leaveController.updateOneLeave);
router.delete('/allLeaves/:id', leaveController.deleteOneLeave)

module.exports = router;