const express = require('express');
const router = express.Router();
const Animaldb = require('../models/animalreg');

// Create and save a new animal
router.post("/create", async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({ message: "Content can not be empty" });
        }
        
        const cow = new Animaldb({
            earTag: req.body.earTag,
            location: req.body.location,
            gender: req.body.gender,
            status: req.body.status,
            age: req.body.age,
            name: req.body.name,
            weight: req.body.weight,
            breed: req.body.breed,
            color: req.body.color,
            birthDate: req.body.birthDate,
        });

        const data = await cow.save();
        res.status(201).send({ success: true, message: "Data added successfully", data });
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while creating" });
    }
});

// Retrieve and return all animals
router.get('/retrieve', async (req, res) => {
    try {
        const data = await Animaldb.find({});
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occurred while retrieving" });
    }
});

// Retrieve an animal by id
router.get('/retrieve/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const animal = await Animaldb.findById(id);
        if (!animal) {
            return res.status(404).send({ message: `Animal with id ${id} not found` });
        }
        res.json({ success: true, data: animal });
    } catch (error) {
        res.status(500).send({ message: `Error retrieving animal: ${error.message}` });
    }
});

// Update an animal by id
router.put('/update/:id', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({ message: "Data to update can not be empty" });
        }
        
        const id = req.params.id;
        const updatedAnimal = await Animaldb.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
        if (!updatedAnimal) {
            res.status(400).send({ message: `Cannot update cow with id ${id}. May be not found` });
        } else {
            // Fetch the updated animal from the database to include in the response
            const updatedData = await Animaldb.findById(id);
            res.status(200).json({ success: true, message: "Animal updated successfully", data: updatedData });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating cow" });
    }
});

// Delete an animal by id
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAnimal = await Animaldb.findByIdAndDelete(id);
        if (!deletedAnimal) {
            return res.status(404).send({ message: `Cannot delete with id ${id}. May be wrong` });
        }
        res.status(200).send({ success: true, message: "Animal deleted successfully", deletedAnimal });
    } catch (error) {
        res.status(500).send({ message: `Couldn't delete: ${error.message}` });
    }
});

// Index route - send a JSON response
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Animal Registry API' });
});

module.exports = router;
