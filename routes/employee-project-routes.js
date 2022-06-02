// This is 'employee-project-route.js' - A File containing all routes for the employee-project-relationship-routes entity

// Importing Requirements
const express = require('express');
const router = express.Router();

// Importing Employee-Project Controller
const employeeProjectControllers = require('../controllers/employee-project-controller')

// Employee-Project-Routes
router.post('/addEmployeeProject', employeeProjectControllers.addNewEmployeeProjectRelationship);
router.put('/allEmployeeProject/:id', employeeProjectControllers.updateOneEmployeeProjectRelationship);
router.delete('/allEmployeeProject/:id', employeeProjectControllers.deleteOneEmployeeProjectRelationship);

module.exports = router;