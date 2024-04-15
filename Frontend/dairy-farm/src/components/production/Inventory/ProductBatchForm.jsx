import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,Checkbox, TextField, Select, MenuItem, FormControl, InputLabel, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { FormControlLabel } from '@mui/material';
import eventBus from '../../../ProductionUtils/EventBus';
import axios from 'axios';

const handleFormSubmitSuccess = () => {
  eventBus.emit('formSubmitted');
};

function ProductBatchForm() {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState('');
  const [milkQuantity, setMilkQuantity] = useState('');
  const [quantity, setQuantity] = useState('');
  const [manufactureDate, setManufactureDate] = useState('');
  const [manufactureTime, setManufactureTime] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [batchId , setBatchId] = useState('');
  const [errors, setErrors] = useState({
    product: '',
    quantity: '',
    manufactureDate: '',
    manufactureTime: '',
    expiryDate: '',
    batchId: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);   
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!product) {
      newErrors.product = 'Product is required';
      valid = false;
    }

    if (!quantity) {
      newErrors.quantity = 'Quantity is required';
      valid = false;
    }

    if (!manufactureDate) {
      newErrors.manufactureDate = 'Manufacture date is required';
      valid = false;
    }

    if (!manufactureTime) {
      newErrors.manufactureTime = 'Manufacture time is required';
      valid = false;
    }

    if (!expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
      valid = false;
    }

    if (!batchId) {
      newErrors.batchId = 'Batch ID is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) {
        return;
      }

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
       // released,
        //storageLocation
      };
      await submitFormToDatabase(formData);
      handleFormSubmitSuccess();
      setSuccessMessage('Form submitted successfully');

      //onSubmitSuccess(); // Call the parent component callback function to notify success
      setProduct('');
    setMilkQuantity('');
    setQuantity('');
    setManufactureDate('');
    setManufactureTime('');
    setExpiryDate('');
    setBatchId('');
    } catch (error) {
      console.error('Failed to submit form data:', error);
      setErrorMessage('Failed to submit form data');
    }
  };

  const submitFormToDatabase = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/ProductBatchCrud/productBatch', formData);
      return response.data;
    } catch (error) {
      throw error.response.data.message || 'Failed to submit form data';
    }
  };

  const handleSnackbarClose = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add New Batch
      </Button>
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
          <DialogTitle align="center">Add New Product Batch</DialogTitle>
          <DialogContent>
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
              {errors.product && <div style={{ color: 'red' }}>{errors.product}</div>}
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
              error={!!errors.quantity}
              helperText={errors.quantity}
            />
            <TextField
              fullWidth
              margin="normal"
              id="manufactureDate"
              label="Manufacture Date"
              type="date"
              value={manufactureDate}
              onChange={(e) => setManufactureDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.manufactureDate}
              helperText={errors.manufactureDate}
            />
            <TextField
              fullWidth
              margin="normal"
              id="manufactureTime"
              label="Manufacture Time"
              type="time"
              value={manufactureTime}
              onChange={(e) => setManufactureTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.manufactureTime}
              helperText={errors.manufactureTime}
            />
            <TextField
              fullWidth
              margin="normal"
              id="expiryDate"
              label="Expiry Date"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.expiryDate}
              helperText={errors.expiryDate}
            />
            <TextField
              fullWidth
              margin="normal"
              id="batchId"
              label="Batch Id"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)} 
              error={!!errors.batchId}
              helperText={errors.batchId}
            />
             
          {/*  <FormControlLabel
              control={<Checkbox checked={released} onChange={(e) => setReleased(e.target.checked)} />}
              label="Released"
          /> 
            <TextField
              fullWidth
              margin="normal"
              id="storageLocation"
              label="Storage Location"
              value={storageLocation}
              onChange={(e) => setStorageLocation(e.target.value)}
          />    */}

         </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
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
