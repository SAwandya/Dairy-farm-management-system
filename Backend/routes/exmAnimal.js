const express = require('express');
const router = express.Router();
const Animaldb2 = require('../models/vacAnim');
const {AnimalRegistry} = require('../models/animalreg');
const ExamAnim = require('../models/exmAnim');
const yup = require('yup');

// Define Yup schema for validation
const examAnimSchema = yup.object().shape({
    earTag: yup.string().required(),
    currentStatus: yup.string().required(),
    exam: yup.string().required(),
    checkdate: yup.string().required(),
});


// Create and save a new animal
router.post("/create", async (req, res) => {
    try {
        await examAnimSchema.validate(req.body, { abortEarly: false });

       
        const { earTag, currentStatus, exam, checkdate } = req.body;
        const examRecord = new ExamAnim({
            earTag,
            currentStatus,
            exam,
            checkdate,
        });

        const data = await examRecord.save();
        res.status(201).send({ success: true, message: "Data added successfully", data });
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Handle validation errors
            const errors = error.inner.map(err => ({ [err.path]: err.message }));
            res.status(400).json({ success: false, message: "Validation error", errors });
        } else {
            // Handle other errors
            console.error("Error creating animal examination record:", error);
            res.status(500).json({ success: false, message: "Error occurred while creating", error: error.message });
        }
    }
});
//count female cows
router.get('/count-sick', async (req, res) => {
    try {
        const count = await ExamAnim.countDocuments({ $or: [{ currentStatus: "Sick" }, { currentStatus: "sick" }] });
        res.json({ success: true, count });
    } catch (error) {
        console.error("Error fetching sick count of cows:", error);
        res.status(500).json({ success: false, error: "Failed to fetch sick count of cows" });
    }
});


// Retrieve animals
router.get('/retrieve', async (req, res) => {
    try {
        const data = await ExamAnim.find({});
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occurred while retrieving" });
    }
});

// Retrieve by id
router.get('/retrieve/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const animal = await ExamAnim.findById(id);
        if (!animal) {
            return res.status(404).send({ message: `Animal with id ${id} not found` });
        }
        res.json({ success: true, data: animal });
    } catch (error) {
        res.status(500).send({ message: `Error retrieving animal: ${error.message}` });
    }
});

//Retrive pregnant
router.get('/retrieve2/pregnant', async (req, res) => {
    try {
        const cows = await ExamAnim.find({ exam: 'Pregnancy Check' });
        res.json({ success: true, data: cows });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occurred while retrieving" });
    }
});

//Retrive Sick
router.get('/retrieve3/sick', async (req, res) => {
    try {
        const cows = await ExamAnim.find({ $or: [{ currentStatus: "Sick" }, { currentStatus: "sick" }]});
        res.json({ success: true, data: cows });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occurred while retrieving" });
    }
});

// Count the records exam == "Pregnancy Check"
router.get('/count-pregnancy-check', async (req, res) => {
    try {
        const count = await ExamAnim.countDocuments({ exam: 'Pregnancy Check' });
        res.json({ success: true, count });
    } catch (error) {
        console.error("Error fetching count of records with exam 'Pregnancy Check':", error);
        res.status(500).json({ success: false, error: "Failed to fetch count of records with exam 'Pregnancy Check'" });
    }
});

// Update by id
router.put('/update/:id', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({ message: "Data to update can not be empty" });
        }
        
        const id = req.params.id;
        const updatedAnimal = await ExamAnim.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
        if (!updatedAnimal) {
            res.status(400).send({ message: `Cannot update cow with id ${id}. May be not found` });
        } else {
            
            const updatedData = await ExamAnim.findById(id);
            res.status(200).json({ success: true, message: "Animal updated successfully", data: updatedData });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating cow" });
    }
});

// Delete by id
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAnimal = await ExamAnim.findByIdAndDelete(id);
        if (!deletedAnimal) {
            return res.status(404).send({ message: `Cannot delete with id ${id}. May be wrong` });
        }
        res.status(200).send({ success: true, message: "Animal deleted successfully", deletedAnimal });
    } catch (error) {
        res.status(500).send({ message: `Couldn't delete: ${error.message}` });
    }
});


router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Examination API' });
});

module.exports = router;
