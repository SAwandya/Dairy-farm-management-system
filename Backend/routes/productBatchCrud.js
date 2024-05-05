const express = require('express');
const router = express.Router();
const ProductBatch = require('../models/ProductBatch'); // Change from Process to ProductBatch

// Create a new productBatch
router.post('/productBatch', async (req, res) => {
  try {
    // Destructure the request body to extract the required fields
    const {productId, name, variant, quantity, manufactureDate, manufactureTime, 
       expiryDate, batchId, released, storageLocation} = req.body;

    // Create a new productBatch document using the extracted fields
    const productBatch = await ProductBatch.create({
      productId, 
      name, 
      variant, 
      quantity,
      manufactureDate, 
      manufactureTime,   
      expiryDate, 
      batchId, 
      released, 
      storageLocation
    });

    // Respond with the newly created productBatch document
    res.status(201).json(productBatch);
  } catch (error) {
    // Handle any errors during productBatch creation
    res.status(400).json({ message: error.message });
  }
});

// Get all productBatches
router.get('/productBatch', async (req, res) => {
  try {
    const productBatches = await ProductBatch.find();
    res.json(productBatches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single productBatch
router.get('/productBatch/:id', async (req, res) => {
  try {
    const productBatch = await ProductBatch.findById(req.params.id);
    if (!productBatch) {
      return res.status(404).json({ message: 'Product batch not found' });
    }
    res.json(productBatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a productBatch
router.put('/productBatch/:id', async (req, res) => {
  try {
    // Extract fields from the request body
    const {
      productId, 
      name, 
      variant, 
      quantity,
      manufactureDate, 
      manufactureTime, 
      expiryDate, 
      batchId, 
      released, 
      storageLocation
    } = req.body;

    // Find the productBatch by ID and update its fields
    const productBatch = await ProductBatch.findByIdAndUpdate(
      req.params.id,
      {
        productId, 
        name, 
        variant, 
        quantity,
        manufactureDate, 
        manufactureTime, 
        expiryDate, 
        batchId, 
        released, 
        storageLocation
      },
      { new: true }
    );

    // Check if the productBatch is found
    if (!productBatch) {
      return res.status(404).json({ message: 'Product batch not found' });
    }

    // Send the updated productBatch as the response
    res.json(productBatch);
  } catch (error) {
    // Handle errors
    res.status(400).json({ message: error.message });
  }
});

// Delete a productBatch
router.delete('/productBatch/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productBatch = await ProductBatch.findByIdAndDelete(id);

    if (!productBatch) {
      return res.status(404).send({ message: `Product batch with ID ${id} not found` });
    }

    return res.status(200).send({ success: true, message: 'Product batch deleted successfully' });
  } catch (error) {
    return res.status(500).send({ message: `Failed to delete product batch: ${error.message}` });
  }
});

router.get('/', async (req, res) => {

  let productbarches = await ProductBatch.find({
    released: true,
    collect: false
  })

  res.send(productbarches);
})

module.exports = router;
