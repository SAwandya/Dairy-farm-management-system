const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();
const { validate, Supplier } = require("../models/supplier");

const c = require("config");
const { number } = require("joi");

// Create
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let supplier = new Supplier({
        name: req.body.name,
        email: req.body.email,
        itemType: req.body.itemType,
        supplierType: req.body.supplierType,
        avgDeliveryTime: req.body.avgDeliveryTime
    });
    supplier = await supplier.save();

    res.send(supplier);
});

// Read all
router.get('/', async (req, res) => {
    const suppliers = await Supplier.find();
    res.send(suppliers);
});

// Read one
router.get('/:id', async (req, res) => {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).send('The supplier with the given ID was not found.');
    res.send(supplier);
});

// Update
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const supplier = await Supplier.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        itemType: req.body.itemType,
        supplierType: req.body.supplierType, 
        avgDeliveryTime: req.body.avgDeliveryTime
    }, { new: true });

    if (!supplier) return res.status(404).send('The supplier with the given ID was not found.');

    res.send(supplier);
});

// Delete
router.delete('/:id', async (req, res) => {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) return res.status(404).send('The supplier with the given ID was not found.');
    res.send(supplier);
});

module.exports = router;