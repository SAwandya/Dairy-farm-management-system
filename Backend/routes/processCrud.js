const express = require('express');
const router = express.Router();
const Process = require('../models/Process');
const mongoose = require('mongoose');

// Create a new process// Create a new process// Create a new process
router.post('/process', async (req, res) => {
  try {
    // Destructure the request body to extract the required fields
    const { product, milkQuantity, ingredients, specialNotes, scheduleDateTime, status } = req.body;

    
    // Initialize variables for scheduleDate and scheduleTime
    let scheduleDate;
    let scheduleTime;

    // If status is "started", set scheduleDate and scheduleTime to current date and time
    if (status === "started") {
      scheduleDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
      scheduleTime = new Date().toLocaleTimeString([], { hour12: false }); // Current time in HH:MM:SS format
    } else {
      // If status is not "started", parse scheduleDateTime into separate date and time
      [scheduleDate, scheduleTime] = scheduleDateTime.split(' ');
    }

    //get current Date and time
    const startTime =  new Date(); 

    // Create a new Process document using the extracted fields
    const process = await Process.create({
      product,
      milkQuantity,
      ingredients,
      specialNotes,
      startTime,
      scheduleDate,
      scheduleTime,
      status
    });

    // Respond with the newly created process document
    res.status(201).json(process);
  } catch (error) {
    // Handle any errors during process creation
    res.status(400).json({ message: error.message });
  }
});



// Get all processes
router.get('/processes', async (req, res) => {
  try {
    const processes = await Process.find();
    res.json(processes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single process
router.get('/process/:id', async (req, res) => {
  try {
    const process = await Process.findById(req.params.id);
    if (!process) {
      return res.status(404).json({ message: 'Process not found' });
    }
    res.json(process);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a process

router.put('/process/:id', async (req, res) => {
  try {
    // Extract fields from the request body
    const {
      product,
      milkQuantity,
      ingredients,
      specialNotes,
      scheduleDateTime,
      status
    } = req.body;

    // Separate the scheduleDateTime into date and time
    const [scheduleDate, scheduleTime] = scheduleDateTime.split(' ');

    // Find the process by ID and update its fields
    const process = await Process.findByIdAndUpdate(
      req.params.id,
      {
        product,
        milkQuantity,
        ingredients,
        specialNotes,
        scheduleDate,
        scheduleTime,
        status
      },
      { new: true }
    );

    // Check if the process is found
    if (!process) {
      return res.status(404).json({ message: 'Process not found' });
    }

    // Send the updated process as the response
    res.json(process);
  } catch (error) {
    // Handle errors
    res.status(400).json({ message: error.message });
  }
});



// Delete a process

router.delete('/process/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const process = await Process.findByIdAndDelete(id);

    if (!process) {
      return res.status(404).send({ message: `Process with ID ${id} not found` });
    }

    return res.status(200).send({ success: true, message: 'Process deleted successfully' });
  } catch (error) {
    return res.status(500).send({ message: `Failed to delete process: ${error.message}` });
  }
});







module.exports = router;
