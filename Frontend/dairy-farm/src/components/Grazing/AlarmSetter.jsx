import React from 'react';
import { Button, TextField } from '@mui/material';

function AlarmSetter({ addAlarm }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const hours = parseInt(event.target.hours.value, 10);
    const minutes = parseInt(event.target.minutes.value, 10);
    const seconds = parseInt(event.target.seconds.value, 10);

    const now = new Date();
    const alarmTime = new Date(now);
    alarmTime.setHours(now.getHours() + hours);
    alarmTime.setMinutes(now.getMinutes() + minutes);
    alarmTime.setSeconds(now.getSeconds() + seconds);

    addAlarm(alarmTime);
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
