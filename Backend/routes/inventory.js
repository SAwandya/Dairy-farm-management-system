const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();
const { validate, Inventory } = require("../models/inventory");
const { Item } = require("../models/item");

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let inventory = new Inventory({
        orderType: req.body.orderType,
        supplierName: req.body.supplierName,
        quantity: req.body.quantity,
    });
    inventory = await inventory.save();

    res.send(inventory);
});

router.get('/', async (req, res) => {
    let inventory = await inventory.find();

    inventory = inventory.map(async inventory => {
        const item = await Item.findById(inventory.orderType);
        return {...inventory._doc, item: item};
    });
    inventory = await Promise.all(inventory);

    res.send(inventory);
});

router.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('The order with the given ID was not found.');
    res.send(order);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const order = await Order.findByIdAndUpdate(req.params.id, {
        orderType: req.body.orderType,
        supplierName: req.body.supplierName,
    }, { new: true });

    if (!order) return res.status(404).send('The order with the given ID was not found.');

    res.send(order);
});

router.delete('/:id', async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).send('The order with the given ID was not found.');
    res.send(order);
});

module.exports = router;