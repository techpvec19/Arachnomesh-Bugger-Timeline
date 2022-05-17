// This is 'project-route.js' - A File containing all routes for the project entity

// Importing Requirements
const express = require('express');
const router = express.Router();

// Importing Employee Controller
const projectControllers = require('../controllers/project-controllers')

// Employee Routes
router.post('/addProject', projectControllers.addNewProject);
router.get('/allProjects', projectControllers.getAllProjects);
router.get('/allProjects/:id', projectControllers.getOneProject);
router.put('/allProjects/:id', projectControllers.updateOneProject);
router.delete('/allProjects/:id', projectControllers.deleteOneProject)

module.exports = router;