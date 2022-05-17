// This is 'Task-route.js' - A File containing all routes for the Task entity

// Importing Requirements
const express = require('express');
const router = express.Router();

// Importing Employee Controller
const taskControllers = require('../controllers/task-controller')

// Employee Routes
router.post('/addTask', taskControllers.addNewTask);
router.get('/allTasks', taskControllers.getAllTasks);
router.get('/allTasks/:id', taskControllers.getOneTask);
router.put('/allTasks/:id', taskControllers.updateOneTask);
router.delete('/allTasks/:id', taskControllers.deleteOneTask)

module.exports = router;