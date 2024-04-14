const express = require('express');
const router = express.Router();
const MilkingData = require('../models/milkingData');

router.post('/', async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content can not be empty" });
    }
    try {
        const existingMilkingData = await MilkingData.find();
        const milkBatchId = existingMilkingData.length + 1;

        const newMilkingData = new MilkingData({
            milkBatchId,
            amountOfMilk: req.body.amountOfMilk,
            duration: req.body.duration,
            qualityCheckResult: req.body.qualityCheckResult,
            issues: req.body.issues,
        });

        await newMilkingData.save();
        res.status(201).json({ success: true, data: newMilkingData });
    } catch (error) {
        console.error('Error adding milking data:', error);
        res.status(500).json({ success: false, error: 'Failed to add milking data' });
    }
});

router.get('/', async (req, res) => {
    try {
        const { date } = req.query;
        let milkingData;
        if (date) {
            // If date is provided, filter milking data based on the date
            milkingData = await MilkingData.find({ createdAt: { $gte: new Date(date) } });
        } else {
            // If date is not provided, fetch all milking data
            milkingData = await MilkingData.find();
        }
        res.status(200).json({ success: true, data: milkingData });
    } catch (error) {
        console.error('Error fetching milking data:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch milking data' });
    }
});

router.get('/:milkBatchId', async (req, res) => {
    const { milkBatchId } = req.params;
    try {
        const milkBatch = await MilkingData.findOne({ milkBatchId });
        if (!milkBatch) {
            return res.status(404).json({ success: false, error: 'Milk batch not found' });
        }
        res.status(200).json({ success: true, amountOfMilk: milkBatch.amountOfMilk });
    } catch (error) {
        console.error('Error fetching amount of milk:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch amount of milk' });
    }
});



module.exports = router;
