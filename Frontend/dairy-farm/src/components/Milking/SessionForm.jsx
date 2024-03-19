import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const AddMilkSessionForm = () => {
  const [session, setSession] = useState({
    sessionId: '', // Set an empty string for the session ID
    date: '',
    time: '',
    cowGroup: '',
    status: '',
    specialNotes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSession({ ...session, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add code to submit the session data to the backend
    console.log('Submitted:', session);
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="sessionId"
          label="Session ID"
          type="text"
          value={session.sessionId}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          value={session.date}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="time"
          label="Time"
          type="time"
          value={session.time}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="cowGroup"
          label="Cow Group"
          value={session.cowGroup}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={session.status}
            onChange={handleChange}
            required
          >
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Incomplete">Incomplete</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="specialNotes"
          label="Special Notes"
          value={session.specialNotes}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Milk Session
        </Button>
      </form>
    </Box>
  );
};

export default AddMilkSessionForm;
