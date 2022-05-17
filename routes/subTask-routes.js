// This is 'SubTask-route.js' - A File containing all routes for the SubTask entity

// Importing Requirements
const express = require('express');
const router = express.Router();

// Importing Employee Controller
const subTaskControllers = require('../controllers/subTask-controller')

// Employee Routes
router.post('/addSubTask', subTaskControllers.addNewSubTask);
router.get('/allSubTasks', subTaskControllers.getAllSubTasks);
router.get('/allSubTasks/:id', subTaskControllers.getOneSubTask);
router.put('/allSubTasks/:id', subTaskControllers.updateOneSubTask);
router.delete('/allSubTasks/:id', subTaskControllers.deleteOneSubTask)

module.exports = router;