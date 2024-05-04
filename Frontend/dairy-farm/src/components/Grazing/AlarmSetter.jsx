import React from 'react';
import { Button, TextField } from '@mui/material';

function AlarmSetter({ addAlarm }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const hours = event.target.hours.value;
    const minutes = event.target.minutes.value;
    const seconds = event.target.seconds.value;
    const time = `${hours}:${minutes}:${seconds}`;
    addAlarm(time);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField type="number" name="hours" label="Hours" InputProps={{ inputProps: { min: 0, max: 23 } }} />
      <TextField type="number" name="minutes" label="Minutes" InputProps={{ inputProps: { min: 0, max: 59 } }} />
      <TextField type="number" name="seconds" label="Seconds" InputProps={{ inputProps: { min: 0, max: 59 } }} />
      <Button type="submit" variant="contained" color="primary">Set Alarm</Button>
    </form>
  );
}

export default AlarmSetter;
