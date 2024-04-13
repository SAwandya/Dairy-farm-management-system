const Inventory = require('../models/inventory');

exports.createInventory = async (req, res) => {
  try {
    const newInventory = new Inventory(req.body);
    const result = await newInventory.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllInventory = async (req, res) => {
  try {
    const inventories = await Inventory.find();
    res.status(200).send(inventories);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) {
      return res.status(404).send();
    }
    res.status(200).send(inventory);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!inventory) {
      return res.status(404).send();
    }
    res.status(200).send(inventory);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!inventory) {
      return res.status(404).send();
    }
    res.status(200).send(inventory);
  } catch (error) {
    res.status(500).send(error);
  }
};