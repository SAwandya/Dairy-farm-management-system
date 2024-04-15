import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, TextField, FormHelperText, Select, MenuItem, InputLabel } from '@mui/material';

function SessionForm({ open, handleClose, handleSubmit, initialData }) {
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState({});
  const isEditMode = !!initialData; // Check if it's in edit mode

  useEffect(() => {
    // Reset form data when initialData changes (e.g., when editing)
    setFormData(initialData || {});
  }, [initialData]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validation rules
    if (!formData.date || new Date(formData.date) < new Date()) {
      newErrors.date = 'Date must be today or later';
      valid = false;
    }
    if (!formData.time) {
      newErrors.time = 'Time is required';
      valid = false;
    }
    if (!formData.grazingDuration || isNaN(formData.grazingDuration)) {
      newErrors.grazingDuration = 'Grazing Duration must be a number';
      valid = false;
    }
    if (!formData.onsiteFeedingDuration || isNaN(formData.onsiteFeedingDuration)) {
      newErrors.onsiteFeedingDuration = 'Walking Duration must be a number';
      valid = false;
    }
    if (!formData.typeOfSession || formData.typeOfSession.trim() === '') {
      newErrors.typeOfSession = 'Type of Session is required';
      valid = false;
    }
    if (!formData.grazingArea || formData.grazingArea.trim() === '') {
      newErrors.grazingArea = 'Grazing Area is required';
      valid = false;
    }
    if (!formData.cowBatch || formData.cowBatch.trim() === '') {
      newErrors.cowBatch = 'Cow Batch is required';
      valid = false;
    }
    if (!formData.assignedEmployee || formData.assignedEmployee.trim() === '') {
      newErrors.assignedEmployee = 'Assigned Employee is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(formData);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEditMode ? 'Edit Session' : 'Add New Session'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <img src='../../../src/assets/farm.jpeg' width={'100%'} height={'100%'}/>
          </Grid>
          <Grid item xs={6}>
            <form onSubmit={handleFormSubmit}>
              <FormControl fullWidth error={!!errors.date}>
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
                />
                {errors.date && <FormHelperText>{errors.date}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth error={!!errors.time}>
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
              <FormControl fullWidth error={!!errors.typeOfSession}>
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
              <FormControl fullWidth error={!!errors.grazingArea}>
                <TextField
                  id="grazingArea"
                  name="grazingArea"
                  label="Grazing Area"
                  value={formData.grazingArea || ''}
                  onChange={handleChange}
                />
                {errors.grazingArea && <FormHelperText>{errors.grazingArea}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth error={!!errors.cowBatch}>
                <TextField
                  id="cowBatch"
                  name="cowBatch"
                  label="Cow Batch"
                  value={formData.cowBatch || ''}
                  onChange={handleChange}
                />
                {errors.cowBatch && <FormHelperText>{errors.cowBatch}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth error={!!errors.assignedEmployee}>
                <TextField
                  id="assignedEmployee"
                  name="assignedEmployee"
                  label="Assigned Employee"
                  value={formData.assignedEmployee || ''}
                  onChange={handleChange}
                />
                {errors.assignedEmployee && <FormHelperText>{errors.assignedEmployee}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth error={!!errors.grazingDuration}>
                <TextField
                  id="grazingDuration"
                  name="grazingDuration"
                  label="Grazing Duration"
                  value={formData.grazingDuration || ''}
                  onChange={handleChange}
                />
                {errors.grazingDuration && <FormHelperText>{errors.grazingDuration}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth error={!!errors.onsiteFeedingDuration}>
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
    </Dialog>
  );
}

export default SessionForm;
