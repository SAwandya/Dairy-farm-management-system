import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, TextField, Button, DialogActions } from '@mui/material';

function PastureForm({ open, handleClose, handleSubmit, initialData }) {
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const handleFormSubmit = () => {
    const newErrors = {};
    if (!formData.area || formData.area.trim() === '') {
      newErrors.area = 'Area is required';
    }
    if (!formData.fertilizerUsed || formData.fertilizerUsed.trim() === '') {
      newErrors.fertilizerUsed = 'Fertilizer Used is required';
    }
    if (!formData.feedingCapacity || isNaN(formData.feedingCapacity)) {
      newErrors.feedingCapacity = 'Feeding Capacity must be a number';
    }
    if (!formData.assignedEmployee || formData.assignedEmployee.trim() === '') {
      newErrors.assignedEmployee = 'Assigned Employee is required';
    }
    if (!formData.typeOfPlantsPlanted || formData.typeOfPlantsPlanted.trim() === '') {
      newErrors.typeOfPlantsPlanted = 'Type of Plants Planted is required';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    handleSubmit(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="area"
          name="area"
          label="Area"
          fullWidth
          value={formData.area || ''}
          onChange={handleChange}
          error={!!errors.area}
          helperText={errors.area}
        />
        <TextField
          margin="dense"
          id="fertilizerUsed"
          name="fertilizerUsed"
          label="Fertilizer Used"
          fullWidth
          value={formData.fertilizerUsed || ''}
          onChange={handleChange}
          error={!!errors.fertilizerUsed}
          helperText={errors.fertilizerUsed}
        />
        <TextField
          margin="dense"
          id="feedingCapacity"
          name="feedingCapacity"
          label="Feeding Capacity"
          fullWidth
          type="number"
          value={formData.feedingCapacity || ''}
          onChange={handleChange}
          error={!!errors.feedingCapacity}
          helperText={errors.feedingCapacity}
        />
        <TextField
          margin="dense"
          id="assignedEmployee"
          name="assignedEmployee"
          label="Assigned Employee"
          fullWidth
          value={formData.assignedEmployee || ''}
          onChange={handleChange}
          error={!!errors.assignedEmployee}
          helperText={errors.assignedEmployee}
        />
        <TextField
          margin="dense"
          id="typeOfPlantsPlanted"
          name="typeOfPlantsPlanted"
          label="Type of Plants Planted"
          fullWidth
          value={formData.typeOfPlantsPlanted || ''}
          onChange={handleChange}
          error={!!errors.typeOfPlantsPlanted}
          helperText={errors.typeOfPlantsPlanted}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleFormSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default PastureForm;
