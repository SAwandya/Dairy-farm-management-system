import React, { useState } from 'react';
import { FormControl, Grid, TextField, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function PastureForm({ open, handleClose, handleSubmit }) {
  const [formData, setFormData] = useState({
    area: '',
    fertilizerUsed: '',
    feedingCapacity: '',
    assignedEmployee: '',
    typeOfPlantsPlanted: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.area) {
      newErrors.area = 'Area is required';
    }
    // Add more validation for other fields
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(formData);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Pasture Block</DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="area"
                  name="area"
                  label="Area"
                  value={formData.area}
                  onChange={handleChange}
                  error={!!errors.area}
                  helperText={errors.area}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="fertilizerUsed"
                  name="fertilizerUsed"
                  label="Fertilizer Used"
                  value={formData.fertilizerUsed}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="feedingCapacity"
                  name="feedingCapacity"
                  label="Feeding Capacity"
                  value={formData.feedingCapacity}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="assignedEmployee"
                  name="assignedEmployee"
                  label="Assigned Employee"
                  value={formData.assignedEmployee}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="typeOfPlantsPlanted"
                  name="typeOfPlantsPlanted"
                  label="Type of Plants Planted"
                  value={formData.typeOfPlantsPlanted}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PastureForm;
