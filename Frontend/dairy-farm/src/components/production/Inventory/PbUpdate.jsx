import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Button, IconButton ,Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField, Select, MenuItem, FormControl, InputLabel, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';

function ProductBatchForm({  id ,onSubmitSuccess }) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState('');
  const [milkQuantity, setMilkQuantity] = useState('');
  const [quantity, setQuantity] = useState('');
  const [manufactureDate, setManufactureDate] = useState('');
  const [manufactureTime, setManufactureTime] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [batchId, setBatchId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (id) {
      // Fetch data for the product batch being updated and pre-fill the form fields
      fetchProductBatchData(id);
    }
  }, [id]);

  const fetchProductBatchData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/ProductBatchCrud/productBatch/${id}`);
      const productBatchData = response.data;
      setProduct(productBatchData.name);
      setMilkQuantity(productBatchData.variant);
      setQuantity(productBatchData.quantity);
      setManufactureDate(productBatchData.manufactureDate);
      setManufactureTime(productBatchData.manufactureTime);
      setExpiryDate(productBatchData.expiryDate);
      setBatchId(productBatchData.batchId);
    } catch (error) {
      console.error('Error fetching product batch data:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      console.log('Form submitted');
      setOpen(false);
      const formData = {
        productId: product === 'Vanilla icecream' ? 'IC001' :
                   product === 'Chocolate icecream' ? 'IC002' :
                   product === 'Milk' ? 'M003' :
                   product === 'Yoghurt' ? 'Y005' : '',
        name: product,
        variant: product === 'Milk' || product.includes('icecream') ? milkQuantity : '',
        quantity,
        manufactureDate,
        manufactureTime,
        expiryDate,
        batchId,
      };
      await updateProductBatch(id, formData);
      setSuccessMessage('Product batch updated successfully');
      onSubmitSuccess(); // Notify parent component about the success
    } catch (error) {
      console.error('Failed to update product batch:', error);
      setErrorMessage('Failed to update product batch');
    }
  };

  const updateProductBatch = async (id, formData) => {
    try {
      await axios.put(`http://localhost:3000/api/ProductBatchCrud/productBatch/${id}`, formData);
    } catch (error) {
      throw error.response.data.message || 'Failed to update product batch';
    }
  };

  const handleSnackbarClose = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <div>
     <IconButton color="primary" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Draggable>
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            width: '26.6%',
            '& .MuiBackdrop-root': {
              backgroundColor: 'transparent',
              position: 'absolute',
            }
          }}
          style={{ left: '33.4%', right: '37%', top: '8%' }}
        >
          <DialogTitle align="center">Update Product Batch</DialogTitle>
          <DialogContent>
            {/* Form fields */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="product-label">Product</InputLabel>
              <Select
                labelId="product-label"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                label="Product"
              >
                <MenuItem value="Chocolate icecream">Chocolate icecream</MenuItem>
                <MenuItem value="Vanilla icecream">Vanilla icecream</MenuItem>
                <MenuItem value="Milk">Milk</MenuItem>
                <MenuItem value="Yoghurt">Yoghurt</MenuItem>
              </Select>
            </FormControl>
            {product === 'Milk' || product.includes('icecream') ? (
              <FormControl fullWidth margin="normal">
                <InputLabel id="variant-label">Variant</InputLabel>
                <Select
                  labelId="variant-label"
                  value={milkQuantity}
                  onChange={(e) => setMilkQuantity(e.target.value)}
                  label="Variant"
                >
                  <MenuItem value="500ml">500ml</MenuItem>
                  <MenuItem value="1000ml">1000ml</MenuItem>
                </Select>
              </FormControl>
            ) : null}

            <TextField
              fullWidth
              margin="normal"
              id="quantity"
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              id="manufactureDate"
              label="Manufacture Date"
              type="date"
              value={manufactureDate}
              onChange={(e) => setManufactureDate(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              id="manufactureTime"
              label="Manufacture Time"
              type="time"
              value={manufactureTime}
              onChange={(e) => setManufactureTime(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              id="expiryDate"
              label="Expiry Date"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              id="batchId"
              label="Batch Id"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">Update</Button>
          </DialogActions>
        </Dialog>
      </Draggable>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
          {successMessage}
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default ProductBatchForm;
