const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();
const { validate, Inventory } = require("../models/inventory");

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let inventory = new Inventory({
        itemName: req.body.itemName,
        quantity: req.body.quantity,
    });
    inventory = await inventory.save();

    res.send(inventory);
});

router.get('/', async (req, res) => {
    try {
      const inventory = await Inventory.find(); 
      res.json(inventory);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) return res.status(404).send('The inventory with the given ID was not found.');
    res.send(inventory);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const inventory = await Inventory.findByIdAndUpdate(req.params.id, {
        itemName: req.body.itemName,
        quantity: req.body.quantity,
    }, { new: true });

    if (!inventory) return res.status(404).send('The inventory with the given ID was not found.');

    res.send(inventory);
});

router.put('/:itemName', async (req, res) => {
    const { quantity } = req.body;
    if (typeof quantity !== 'number') {
      return res.status(400).send('Invalid quantity');
    }
  
    const inventory = await Inventory.findOne({ itemName: req.params.itemName });
    if (!inventory) {
      return res.status(404).send('Item not found');
    }
  
    if (inventory.quantity < quantity) {
      return res.status(400).send('Not enough items in stock');
    }
  
    inventory.quantity -= quantity;
    inventory.lastUpdated = Date.now();
    await inventory.save();
  
    res.send(inventory);
  });

router.delete('/:id', async (req, res) => {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!inventory) return res.status(404).send('The inventory with the given ID was not found.');
    res.send(inventory);
});

module.exports = router;