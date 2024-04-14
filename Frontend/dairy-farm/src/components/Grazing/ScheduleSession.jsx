import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, TextField } from '@mui/material';

function ScheduleSessionForm() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    typeOfSession: '',
    grazingArea: '',
    cowBatch: '',
    assignedEmployee: '',
    grazingDuration: '',
    onsiteFeedingDuration: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic here
    // Example validation:
    const newErrors = {};
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    // Add more validation for other fields
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Submit logic here
      console.log('Form submitted:', formData);
      handleClose();
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Clear form data and errors when closing the dialog
    setFormData({
      date: '',
      time: '',
      typeOfSession: '',
      grazingArea: '',
      cowBatch: '',
      assignedEmployee: '',
      grazingDuration: '',
      onsiteFeedingDuration: '',
    });
    setErrors({});
  };

  return (
    <div style={{ position: 'absolute', top: '43px', right: '43px' }}>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Schedule
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Schedule a Session</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    id="date"
                    name="date"
                    label="Date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    error={!!errors.date}
                    helperText={errors.date}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    id="time"
                    name="time"
                    label="Time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="typeOfSession"
                    name="typeOfSession"
                    label="Type of Session"
                    value={formData.typeOfSession}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="grazingArea"
                    name="grazingArea"
                    label="Grazing Area"
                    value={formData.grazingArea}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="cowBatch"
                    name="cowBatch"
                    label="Cow Batch"
                    value={formData.cowBatch}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
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
                    id="grazingDuration"
                    name="grazingDuration"
                    label="Grazing Duration"
                    value={formData.grazingDuration}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="onsiteFeedingDuration"
                    name="onsiteFeedingDuration"
                    label="Onsite Feeding Duration"
                    value={formData.onsiteFeedingDuration}
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
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ScheduleSessionForm;
