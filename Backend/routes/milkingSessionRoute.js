const express = require('express');
const router = express.Router();
const milkingSession = require('../models/milkingSession');


router.post('/', async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content can not be empty" });
    }
    try {
        const newMilkingSession = new milkingSession({
            sessionId: req.body.sessionId,
            date: req.body.date,
            time: req.body.time,
            cowGroup: req.body.cowGroup,
            status: req.body.status,
            specialNotes: req.body.specialNotes,
        });

        await newMilkingSession.save();
        res.status(201).json({ success: true, data: newMilkingSession });
    } catch (error) {
        console.error('Error adding milk session:', error);
        res.status(500).json({ success: false, error: 'Failed to add milk session' });
    }
});

module.exports = router;