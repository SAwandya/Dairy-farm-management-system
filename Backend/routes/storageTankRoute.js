const express = require('express');
const router = express.Router();
const StorageTank = require('../models/storageTank');

// POST method to add a new milking session
router.post('/', async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content can not be empty" });
    }
    try {
        const newStorageTank = new StorageTank({
            tankId: req.body.tankId,
            capacity: req.body.capacity,
            installedDate: req.body.installedDate,
            manufacturer: req.body.manufacturer,
            specialNotes: req.body.specialNotes,
        });

        await newStorageTank.save();
        res.status(201).json({ success: true, data: newStorageTank });
    } catch (error) {
        console.error('Error adding storage tank:', error);
        res.status(500).json({ success: false, error: 'Failed to add storage tank' });
    }
});

router.get('/', async (req, res) => {
    try {
        const storageTank = await StorageTank.find();
        res.status(200).json({ success: true, data: storageTank });
    } catch (error) {
        console.error('Error fetching storage tanks:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch storage tanks' });
    }
});

module.exports = router;
