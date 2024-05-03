import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Button,Box, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField, Select, MenuItem, Slider, Typography, FormControl, InputLabel, Checkbox, FormControlLabel, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import eventBus from "../../ProductionUtils/EventBus"


const handleFormSubmitSuccess = () => {
  eventBus.emit('formSubmitted');
};

function NewProcessForm({ onSubmitSuccess }) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState('');
  const [milkQuantity, setMilkQuantity] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [specialNotes, setSpecialNotes] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [status, setStatus] = useState('started'); // Default status
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false); // State to manage scheduling checkbox
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const maxMilkQuantity = 1200; // Maximum milk quantity limit

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setShowCancelConfirmation(true);
  };

  const handleCancelConfirmation = (confirmed) => {
    setShowCancelConfirmation(false);
    if (confirmed) {
      resetFields();
      setOpen(false);
    }
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
        scheduleDateTime: `${scheduleDate} ${scheduleTime}`,
        status: isScheduled ? 'scheduled' : 'started' // Update status based on scheduling checkbox
      };
      await submitFormToDatabase(formData);
      //fetching results to ProcessTable
      handleFormSubmitSuccess();
      setSuccessMessage('Form submitted successfully');
      // Reset form fields after successful submission
      resetFields();
    } catch (error) {
      console.error('Failed to submit form data:', error);
      setErrorMessage('Failed to submit form data');
    }
  };

  function resetFields(){
      setProduct('');
      setMilkQuantity(0);
      setIngredients([]);
      setSpecialNotes('');
      setScheduleDate('');
      setScheduleTime('');
      setStatus('started'); // Reset status to 'started'
      setIsScheduled(false); // Reset scheduling checkbox
  }

  const submitFormToDatabase = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/processCrud/process', formData);
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
        Add New Process
      </Button>
      <Draggable>

        <Dialog open={open} onClose={handleClose}

          sx={{
            width: '27.6%',
            
            '& .MuiBackdrop-root': {
              backgroundColor: 'transparent',
              position: 'absolute',
            }

          }} style={{ left: '36.8%', right: '37%', top: '6.3%',   }}

        >
              <Box  sx={{backgroundColor: '#F0F0F0', borderBottomLeftRadius:20,borderBottomRightRadius:20}} >
          <DialogTitle align="center" fontWeight="bold">Add New Process</DialogTitle>
          <DialogContent >
            <FormControl fullWidth margin="normal">
              <InputLabel id="product-label">Product</InputLabel>
              <Select
                labelId="product-label"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                label="Product"
              >
                <MenuItem value="Chocolate Icecream">Chocolate icecream</MenuItem>
                <MenuItem value="Vanilla Icecream">Vanilla icecream</MenuItem>
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
            <FormControlLabel
              control={<Checkbox checked={isScheduled} onChange={(e) => setIsScheduled(e.target.checked)} />}
              label="Schedule"
            />
            {isScheduled && (
              <div>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Schedule Date"
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Schedule Time"
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            )}
          </DialogContent>
          </Box>
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
          </DialogActions>
        </Dialog>
      </Draggable>
      <Dialog
        open={showCancelConfirmation}
        onClose={() => handleCancelConfirmation(false)}
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
          <Button onClick={() => handleCancelConfirmation(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleCancelConfirmation(true)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
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

export default NewProcessForm;
