// This is 'Assignment-route.js' - A File containing all routes for the Assignment entity

// Importing Requirements
const express = require('express');
const router = express.Router();

// Importing Employee Controller
const assignmentControllers = require('../controllers/assignment-controller')

// Employee Routes
router.post('/addAssignment', assignmentControllers.addNewAssignment);
router.get('/allAssignments', assignmentControllers.getAllAssignments);
router.get('/allAssignments/:id', assignmentControllers.getOneAssignment);
router.put('/allAssignments/:id', assignmentControllers.updateOneAssignment);
router.delete('/allAssignments/:id', assignmentControllers.deleteOneAssignment)

module.exports = router;