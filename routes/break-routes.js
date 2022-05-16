// This is 'break-routes.js' - A File containing all routes for the Break entity

// Importing Requirements
const express = require('express');
const router = express.Router();

// Importing break Controller
const breakController = require('../controllers/break-controller')

// Employee Routes
router.post('/addBreak', breakController.addNewBreak);
router.put('/allBreaks/:id', breakController.updateOneBreak);
router.delete('/allBreaks/:id', breakController.deleteOneBreak)

module.exports = router;