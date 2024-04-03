import React, { useState } from 'react';

import { Button, Dialog, DialogTitle, DialogContent, DialogActions,DialogContentText , 
    TextField, Select, MenuItem, Slider, Typography, FormControl, InputLabel, FormControlLabel, 
    Checkbox } from '@mui/material';
/*
import AdapterDateFns from '@mui/lab-date-pickers';
import { DesktopTimePicker,DesktopDatePicker } from '@mui/x-date-pickers-pro'; */
import axios from 'axios';

function NewProcessForm() {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState('');
  const [milkQuantity, setMilkQuantity] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [specialNotes, setSpecialNotes] = useState('');
  const [scheduleDate, setScheduleDate] = useState(null);
  const [status, setStatus] = useState('scheduled'); // Default status
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

  const maxMilkQuantity = 1000; // Maximum milk quantity limit

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
        product,
        milkQuantity,
        ingredients,
        specialNotes,
        scheduleDate,
        status
      };
      await submitFormToDatabase(formData);
    } catch (error) {
      console.error('Failed to submit form data:', error);
    }
  };

  const submitFormToDatabase = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/processCrud/process', formData);
      return response.data;
    } catch (error) {
      throw error.response.data.message || 'Failed to submit form data';
    }
  };

  const handleStart = () => {
    setStatus('started');
    handleSubmit();
  };

  const handleSchedule = () => {
    setStatus('scheduled');
    handleSubmit();
  };

  const handleCancel = () => {
    setShowCancelConfirmation(true);
  };

  const handleCancelConfirmation = () => {
    setShowCancelConfirmation(false);
  };

  const handleConfirmCancel = () => {
    setShowCancelConfirmation(false);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add New Process
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Process</DialogTitle>
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
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Typography id="milk-quantity-slider" gutterBottom>
              Milk Quantity: {milkQuantity} (Max: {maxMilkQuantity})
            </Typography>
            <Slider
              aria-labelledby="milk-quantity-slider"
              value={milkQuantity}
              onChange={(e, newValue) => setMilkQuantity(newValue)}
              min={0}
              max={maxMilkQuantity}
            />
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label={`Milk Quantity (Max: ${maxMilkQuantity})`}
            type="number"
            InputProps={{ inputProps: { min: 0, max: maxMilkQuantity } }}
            value={milkQuantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 0 && value <= maxMilkQuantity) {
                setMilkQuantity(value);
              }
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Ingredients"
            select
            SelectProps={{
              multiple: true,
              value: ingredients,
              onChange: (e) => setIngredients(e.target.value),
            }}
          >
            <MenuItem value="Chocolate powder">Chocolate powder</MenuItem>
            <MenuItem value="Heavy cream">Heavy cream</MenuItem>
            <MenuItem value="Sugar">Sugar</MenuItem>
            <MenuItem value="Vanilla">Vanilla</MenuItem>
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            label="Special Notes"
            value={specialNotes}
            onChange={(e) => setSpecialNotes(e.target.value)}
          />
         {/*} <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Schedule Date"
              value={scheduleDate}
              onChange={(newValue) => setScheduleDate(newValue)}
              renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
            />
            <DesktopTimePicker
              label="Schedule Time"
              value={scheduleDate}
              onChange={(newValue) => setScheduleDate(newValue)}
              renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
            />
        </LocalizationProvider> */}

          {/* Hidden input field 
          <FormControlLabel
            control={<Checkbox checked={status === 'started'} onChange={(e) => setStatus(e.target.checked ? 'started' : 'scheduled')} />} 
            label="Status"
            style={{ display: 'none' }}
          /> */}
          <input type="hidden" value={status} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSchedule} variant="contained" color="primary">Schedule</Button>
          <Button onClick={handleStart} variant="contained" color="primary">Start</Button>
          <Dialog
            open={showCancelConfirmation}
            onClose={handleCancelConfirmation}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Cancel Confirmation</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to cancel?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelConfirmation} color="primary">
                No
              </Button>
              <Button onClick={handleConfirmCancel} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewProcessForm;
