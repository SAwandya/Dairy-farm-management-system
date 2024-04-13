const express = require('express');
const router = express.Router();
const PregnantAnimal = require('../models/pregnantCow'); 

// Create a new pregnant 
router.post('/pregnantCreate', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({ success: false, message: "Request body cannot be empty" });
        }
        const { earTag, maleCowMateId, dateOfMate, isPregnant, calvingDate} = req.body;

    const cow = new PregnantAnimal({
        earTag,
        maleCowMateId,
        dateOfMate,
        isPregnant,
        calvingDate,
    });

    const data = await cow.save();
    res.status(201).send({ success: true, message: "Data added successfully", data });
} catch (error) {
    console.error("Error creating animal:", error);
    res.status(500).send({ success: false, message: "Error occurred while creating", error: error.message });
}
});

// Retrieve all pregnant 
router.get('/pregnantRetrieve', async (req, res) => {
    try {
        const pregnantAnimals = await PregnantAnimal.find();
        res.status(200).json({ success: true, data: pregnantAnimals });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Retrieve by id
router.get('/pregnantRetrieve/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const animal = await PregnantAnimal.findById(id);
        if (!animal) {
            return res.status(404).send({ message: `Animal with id ${id} not found` });
        }
        res.json({ success: true, data: animal });
    } catch (error) {
        res.status(500).send({ message: `Error retrieving animal: ${error.message}` });
    }
});


// Update by id
router.put('/pregnantUpdate/:id', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({ message: "Data to update can not be empty" });
        }
        
        const id = req.params.id;
        const updatedAnimal = await PregnantAnimal.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
        if (!updatedAnimal) {
            res.status(400).send({ message: `Cannot update cow with id ${id}. May be not found` });
        } else {

            const updatedData = await PregnantAnimal.findById(id);
            res.status(200).json({ success: true, message: "Animal updated successfully", data: updatedData });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating cow" });
    }
});

// Delete by id
router.delete('/pregnantDelete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAnimal = await PregnantAnimal.findByIdAndDelete(id);
        if (!deletedAnimal) {
            return res.status(404).send({ message: `Cannot delete with id ${id}. May be wrong` });
        }
        res.status(200).send({ success: true, message: "Animal deleted successfully", deletedAnimal });
    } catch (error) {
        res.status(500).send({ message: `Couldn't delete: ${error.message}` });
    }
});
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Pregnant Cow API' });
});


module.exports = router;
