const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();
const { validate, Item } = require("../models/item");
const c = require("config");
const { number } = require("joi");

// Create
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let item = new Item({
        itemName: req.body.itemName,
        description: req.body.description,
        itemPriority: req.body.itemPriority,
        perUnitCost: req.body.perUnitCost
    });
    item = await item.save();

    res.send(item);
});

// Read all
router.get('/', async (req, res) => {
    const items = await Item.find();
    res.send(items);
});

// Read one
router.get('/:id', async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send('The item with the given ID was not found.');
    res.send(item);
});

// Update
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const item = await Item.findByIdAndUpdate(req.params.id, {
        itemName: req.body.itemName,
        description: req.body.description,
        itemPriority: req.body.itemPriority,
        perUnitCost: req.body.perUnitCost
    }, { new: true });

    if (!item) return res.status(404).send('The item with the given ID was not found.');

    res.send(item);
});

// Delete
router.delete('/:id', async (req, res) => {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).send('The item with the given ID was not found.');
    res.send(item);
});

module.exports = router;