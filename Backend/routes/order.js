const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();
const { validate, Order } = require("../models/order");
const { Item } = require("../models/item");
const c = require("config");
const { number } = require("joi");

// Create
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let order = new Order({

        orderType: req.body.orderType,
        supplierName: req.body.supplierName,
        orderStatus: req.body.orderStatus,
        quantity: req.body.quantity,
        advanceFee: req.body.advanceFee,
        deliveryDate: req.body.deliveryDate
    });
    order = await order.save();

    res.send(order);
});

// Read all
router.get('/', async (req, res) => {
    let orders = await Order.find();
    orders = orders.map(async order => {
        // console.log({...order});
        const item = await Item.findById(order.orderType);
        return {...order._doc, item: item};
    });
    orders = await Promise.all(orders);
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
        orderStatus: req.body.orderStatus,
        quantity: req.body.quantity,
        advanceFee: req.body.advanceFee,
        deliveryDate: req.body.deliveryDate
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

