const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();
const { validate, Transaction } = require("../models/transaction");
const c = require("config");

// Create
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let transaction = new Transaction({
        date: req.body.date,
        type: req.body.type,
        description: req.body.description,
        department: req.body.department,
        value: req.body.value
    });
    transaction = await transaction.save();

    res.send(transaction);
});

// Read all
router.get('/', async (req, res) => {
    const transactions = await Transaction.find();
    res.send(transactions);
});

// Read one
router.get('/:id', async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).send('The transaction with the given ID was not found.');
    res.send(transaction);
});

// Update
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const transaction = await Transaction.findByIdAndUpdate(req.params.id, {
        date: req.body.date,
        type: req.body.type,
        description: req.body.description,
        department: req.body.department,
        value: req.body.value
    }, { new: true });

    if (!transaction) return res.status(404).send('The transaction with the given ID was not found.');

    res.send(transaction);
});

// Delete
router.delete('/:id', async (req, res) => {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).send('The transaction with the given ID was not found.');
    res.send(transaction);
});

module.exports = router;
