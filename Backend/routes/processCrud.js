const express = require('express');
const router = express.Router();
const Process = require('../models/Process');

// Create a new process
router.post('/process', async (req, res) => {
  try {
    const process = await Process.create(req.body);
    res.status(201).json(process);
  } catch (error) {
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
    const process = await Process.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!process) {
      return res.status(404).json({ message: 'Process not found' });
    }
    res.json(process);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a process
router.delete('/process/:id', async (req, res) => {
  try {
    const process = await Process.findByIdAndDelete(req.params.id);
    if (!process) {
      return res.status(404).json({ message: 'Process not found' });
    }
    res.json({ message: 'Process deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
