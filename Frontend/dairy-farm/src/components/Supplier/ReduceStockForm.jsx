import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Swal from 'sweetalert2';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';

const ReduceStockForm = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [itemError, setItemError] = useState('');

  const validateItem = () => {
    if (!selectedItem) {
      setItemError('Item is required');
    } else {
      setItemError('');
    }
  };

  const validateQuantity = () => {
    if (quantity <= 0) {
      setError('Quantity must be greater than zero');
    } else {
      setError('');
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('http://localhost:3000/api/inventory');
      setItems(response.data);
    };
    fetchItems();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateItem();
    if (quantity <= 0) {
      setError('Quantity must be greater than zero');
      return;
    }
    const item = items.find(item => item._id === selectedItem);
    if (!item) {
      console.error('Selected item not found');
      return;
    }
    await axios.put(`http://localhost:3000/api/inventory/${selectedItem}`, {
      itemName: item.itemName,
      quantity: -quantity,
    });
    setSelectedItem('');
    setQuantity('');
    setShowForm(false);
    setError('');

    Swal.fire(
      'Success!',
      'Stock request is placed.',
      'success'
    );
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const uniqueItems = items.reduce((unique, item) => {
    return unique.some(u => u.itemName === item.itemName) ? unique : [...unique, item];
  }, []);

  return (
    <>
    <Button variant="contained" color="primary" onClick={() => setShowForm(true)} style={{ backgroundColor: '#1a6952' }}>
      Get Stocks
    </Button>

      <Dialog open={showForm} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md">
        <DialogTitle id="form-dialog-title">
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            Get Stocks
          </Typography>
        </DialogTitle>
        <DialogContent style={{ minHeight: '200px'}}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <FormControl fullWidth error={!!itemError}>
                <InputLabel>Item</InputLabel>
                <Select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)} required>
                  {uniqueItems.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.itemName}
                    </MenuItem>
                  ))}
                </Select>
                {itemError && <FormHelperText style={{ color: 'red' }}>{itemError}</FormHelperText>}
              </FormControl>
              </Grid>
              <Grid item xs={12}>
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                onBlur={validateQuantity}
                required
                fullWidth
                error={!!error}
                helperText={error}
              />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReduceStockForm;