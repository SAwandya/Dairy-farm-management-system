const express = require('express');
const router = express.Router();
const inventoryController = require('../models/inventoryController');
const Inventory = require('../models/inventory');

// Create a new inventory item
router.post('/inventory', inventoryController.createInventory);

// Get all inventory items
router.get('/inventory', inventoryController.getAllInventory);

// Get a specific inventory item
router.get('/inventory/:id', inventoryController.getInventory);

// Update a specific inventory item
router.put('/inventory/:id', inventoryController.updateInventory);

// Delete a specific inventory item
router.delete('/inventory/:id', inventoryController.deleteInventory);

module.exports = router;