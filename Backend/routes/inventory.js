const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();
const { validate, Order } = require("../models/order");

// Create
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let order = new Order({
        orderType: req.body.orderType,
        supplierName: req.body.supplierName,
        // add other properties...
    });
    order = await order.save();

    res.send(order);
});

// Read all
router.get('/', async (req, res) => {
    const orders = await Order.find();
    res.send(orders);
});

// Read one
router.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('The order with the given ID was not found.');
    res.send(order);
});

// Update
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const order = await Order.findByIdAndUpdate(req.params.id, {
        orderType: req.body.orderType,
        supplierName: req.body.supplierName,
        // add other properties...
    }, { new: true });

    if (!order) return res.status(404).send('The order with the given ID was not found.');

    res.send(order);
});

// Delete
router.delete('/:id', async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).send('The order with the given ID was not found.');
    res.send(order);
});

module.exports = router;