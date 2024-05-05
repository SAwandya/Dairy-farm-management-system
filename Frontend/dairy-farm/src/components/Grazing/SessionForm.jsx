import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, TextField, FormHelperText, Select, MenuItem, InputLabel } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SessionForm({ open, handleClose, handleSubmit, initialData }) {
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState({});
  const isEditMode = !!initialData; // Check if it's in edit mode

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const validateDate = (date) => {
    if (!date || new Date(date) < new Date()) {
      return 'Date must be today or later';
    }
    return '';
  };

  const validateTime = (time) => {
    if (!time) {
      return 'Time is required';
    }
    return '';
  };

  const validateDuration = (duration) => {
    if (!duration || isNaN(duration) || parseFloat(duration) < 0) {
      return 'Duration must be a non-negative number';
    }
    return '';
  };

  const validateSessionType = (type) => {
    if (!type || !['Morning', 'Evening'].includes(type)) {
      return 'Invalid session type';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Validate each field as it changes and update errors state
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'date':
        return validateDate(value);
      case 'time':
        return validateTime(value);
      case 'grazingDuration':
      case 'onsiteFeedingDuration':
        return validateDuration(value);
      case 'typeOfSession':
        return validateSessionType(value);
      default:
        return '';
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const fieldErrors = Object.keys(formData).reduce((acc, key) => {
      acc[key] = validateField(key, formData[key]);
      return acc;
    }, {});

    // Set errors for all fields
    setErrors(fieldErrors);

    // Check if there are any errors
    const hasErrors = Object.values(fieldErrors).some(error => error !== '');

    if (hasErrors) {
      toast.error('Please fix all errors before submitting.');
    } else {
      handleSubmit(formData);
      handleClose(); // Close the dialog after form submission
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEditMode ? 'Edit Session' : 'Add New Session'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img src='../../../src/assets/farm.jpeg' width={'100%'} height={'100%'} alt="Farm" />
          </Grid>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleFormSubmit}>
              <FormControl fullWidth error={!!errors.date} margin="normal">
                <TextField
                  id="date"
                  name="date"
                  label="Date"
                  type="date"
                  value={formData.date || ''}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: new Date().toISOString().split('T')[0], // Set min attribute to today's date
                  }}
                />
                {errors.date && <FormHelperText>{errors.date}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth error={!!errors.time} margin="normal">
                <TextField
                  id="time"
                  name="time"
                  label="Time"
                  type="time"
                  value={formData.time || ''}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {errors.time && <FormHelperText>{errors.time}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth error={!!errors.typeOfSession} margin="normal">
                <InputLabel id="typeOfSession-label">Session Category</InputLabel>
                <Select
                  labelId="typeOfSession-label"
                  id="typeOfSession"
                  name="typeOfSession"
                  value={formData.typeOfSession || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="Morning">Morning</MenuItem>
                  <MenuItem value="Evening">Evening</MenuItem>
                </Select>
                {errors.typeOfSession && <FormHelperText>{errors.typeOfSession}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth error={!!errors.grazingArea} margin="normal">
                <TextField
                  id="grazingArea"
                  name="grazingArea"
                  label="Grazing Area"
                  value={formData.grazingArea || ''}
                  onChange={handleChange}
                />
                {errors.grazingArea && <FormHelperText>{errors.grazingArea}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth error={!!errors.cowBatch} margin="normal">
                <TextField
                  id="cowBatch"
                  name="cowBatch"
                  label="Cow Batch"
                  value={formData.cowBatch || ''}
                  onChange={handleChange}
                />
                {errors.cowBatch && <FormHelperText>{errors.cowBatch}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth error={!!errors.assignedEmployee} margin="normal">
                <TextField
                  id="assignedEmployee"
                  name="assignedEmployee"
                  label="Assigned Employee"
                  value={formData.assignedEmployee || ''}
                  onChange={handleChange}
                />
                {errors.assignedEmployee && <FormHelperText>{errors.assignedEmployee}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth error={!!errors.grazingDuration} margin="normal">
                <TextField
                  id="grazingDuration"
                  name="grazingDuration"
                  label="Grazing Duration"
                  value={formData.grazingDuration || ''}
                  onChange={handleChange}
                />
                {errors.grazingDuration && <FormHelperText>{errors.grazingDuration}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth error={!!errors.onsiteFeedingDuration} margin="normal">
                <TextField
                  id="onsiteFeedingDuration"
                  name="onsiteFeedingDuration"
                  label="Walking Duration"
                  value={formData.onsiteFeedingDuration || ''}
                  onChange={handleChange}
                />
                {errors.onsiteFeedingDuration && <FormHelperText>{errors.onsiteFeedingDuration}</FormHelperText>}
              </FormControl>
            </form>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} variant="contained" color="primary">
          {isEditMode ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
      <ToastContainer />
    </Dialog>
  );
}

export default SessionForm;
