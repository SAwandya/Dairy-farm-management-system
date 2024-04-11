// sessions.js

const express = require("express");
const router = express.Router();
const SessionDetail = require("../models/SessionDetail");

// Create a new session
router.post("/", async (req, res) => {
    try {
        const sessionDetail = new SessionDetail(req.body);
        await sessionDetail.save();
        res.status(201).send(sessionDetail);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Retrieve all sessions
router.get("/", async (req, res) => {
    try {
        const sessions = await SessionDetail.find();
        res.status(200).send(sessions);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Retrieve a session by ID
router.get("/:id", async (req, res) => {
    try {
        const session = await SessionDetail.findById(req.params.id);
        if (!session) {
            return res.status(404).send({ message: "Session not found" });
        }
        res.status(200).send(session);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a session by ID
router.put("/:id", async (req, res) => {
    try {
        const session = await SessionDetail.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!session) {
            return res.status(404).send({ message: "Session not found" });
        }
        res.status(200).send(session);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a session by ID
router.delete("/:id", async (req, res) => {
    try {
        const session = await SessionDetail.findByIdAndDelete(req.params.id);
        if (!session) {
            return res.status(404).send({ message: "Session not found" });
        }
        res.status(200).send({ message: "Session deleted successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
