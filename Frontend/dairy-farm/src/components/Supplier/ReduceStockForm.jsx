import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Swal from 'sweetalert2';

const ReduceStockForm = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('http://localhost:3000/api/inventory');
      setItems(response.data);
    };
    fetchItems();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
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
    // Display SweetAlert when stocks are ordered
    Swal.fire({
      title: "Stocks Ordered",
      text: "Stocks have been successfully ordered.",
      icon: "success",
      confirmButtonText: "OK"
    });
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

      <Dialog open={showForm} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Get Stocks</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Item</InputLabel>
                  <Select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)} required>
                    {uniqueItems.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.itemName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReduceStockForm;
