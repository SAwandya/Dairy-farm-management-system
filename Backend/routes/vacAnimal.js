const express = require('express');
const router = express.Router();
const Animaldb2 = require('../models/vacAnim');
const AnimalRegistry = require('../models/animalreg');

// Create and save a new animal
router.post("/create", async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({ success: false, message: "Request body cannot be empty" });
        }

        const { earTag, status, age, vaccine, vacdate, nextdate } = req.body;

        if (!earTag || !status || !age || !vaccine || !vacdate || !nextdate) {
            return res.status(400).send({ success: false, message: "All fields are required" });
        }


        const cow = new Animaldb2({
            earTag,
            status,
            age,
            vaccine,
            vacdate,
            nextdate,
        });

        const data = await cow.save();
        res.status(201).send({ success: true, message: "Data added successfully", data });
    } catch (error) {
        console.error("Error creating animal:", error);
        res.status(500).send({ success: false, message: "Error occurred while creating", error: error.message });
    }
});

// Retrieve animals
router.get('/retrieve', async (req, res) => {
    try {
        const data = await Animaldb2.find({});
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occurred while retrieving" });
    }
});

// Retrieve by id
router.get('/retrieve/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const animal = await Animaldb2.findById(id);
        if (!animal) {
            return res.status(404).send({ message: `Animal with id ${id} not found` });
        }
        res.json({ success: true, data: animal });
    } catch (error) {
        res.status(500).send({ message: `Error retrieving animal: ${error.message}` });
    }
});

// Update by id
router.put('/update/:id', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({ message: "Data to update can not be empty" });
        }
        
        const id = req.params.id;
        const updatedAnimal = await Animaldb2.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
        if (!updatedAnimal) {
            res.status(400).send({ message: `Cannot update cow with id ${id}. May be not found` });
        } else {

            const updatedData = await Animaldb2.findById(id);
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
        const deletedAnimal = await Animaldb2.findByIdAndDelete(id);
        if (!deletedAnimal) {
            return res.status(404).send({ message: `Cannot delete with id ${id}. May be wrong` });
        }
        res.status(200).send({ success: true, message: "Animal deleted successfully", deletedAnimal });
    } catch (error) {
        res.status(500).send({ message: `Couldn't delete: ${error.message}` });
    }
});


router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Vaccination API' });
});

module.exports = router;
