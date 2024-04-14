import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

const EffluentForm = ({ open, handleClose, handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    date: '',
    grazingArea: '',
    wasteCollected: '',
    wasteType: '',
  });

  const [errors, setErrors] = useState({
    date: '',
    grazingArea: '',
    wasteCollected: '',
    wasteType: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        date: '',
        grazingArea: '',
        wasteCollected: '',
        wasteType: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      date: '',
      grazingArea: '',
      wasteCollected: '',
      wasteType: '',
    };

    if (!formData.date) {
      newErrors.date = 'Date is required';
      isValid = false;
    }

    if (!formData.grazingArea) {
      newErrors.grazingArea = 'Grazing Area is required';
      isValid = false;
    }

    if (!formData.wasteCollected) {
      newErrors.wasteCollected = 'Amount of Waste Collected is required';
      isValid = false;
    } else if (isNaN(formData.wasteCollected)) {
      newErrors.wasteCollected = 'Amount of Waste Collected must be a number';
      isValid = false;
    }

    if (!formData.wasteType) {
      newErrors.wasteType = 'Type of Waste is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmitForm = () => {
    if (validateForm()) {
      handleSubmit(formData);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{initialData ? 'Edit Effluent Detail' : 'Add New Effluent Detail'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          error={!!errors.date}
          helperText={errors.date}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Grazing Area"
          name="grazingArea"
          value={formData.grazingArea}
          onChange={handleChange}
          error={!!errors.grazingArea}
          helperText={errors.grazingArea}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Amount of Waste Collected (kg)"
          name="wasteCollected"
          type="number"
          value={formData.wasteCollected}
          onChange={handleChange}
          error={!!errors.wasteCollected}
          helperText={errors.wasteCollected}
        />
        <FormControl fullWidth error={!!errors.wasteType} margin="normal">
          <InputLabel>Type of Waste</InputLabel>
          <Select
            name="wasteType"
            value={formData.wasteType}
            onChange={handleChange}
          >
            <MenuItem value="weeds">Weeds</MenuItem>
            <MenuItem value="livestockManure">Livestock Manure</MenuItem>
            <MenuItem value="discardedProduction">Discarded Production</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          {errors.wasteType && <FormHelperText>{errors.wasteType}</FormHelperText>}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmitForm} color="primary">{initialData ? 'Update' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EffluentForm;
