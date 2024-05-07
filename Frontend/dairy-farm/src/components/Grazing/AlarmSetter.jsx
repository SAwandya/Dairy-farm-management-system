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
    alarmTime.setHours(hours);
    alarmTime.setMinutes(minutes);
    alarmTime.setSeconds(seconds);

    const currentTime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const alarmScheduledTime = hours * 3600 + minutes * 60 + seconds;

    if (alarmScheduledTime <= currentTime) {
      alert("Scheduled time should be in the future.");
      return;
    }

    addAlarm(alarmTime);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField type="number" name="hours" label="Hours" InputProps={{ inputProps: { min: 0, max: 23 } }} />
      <TextField type="number" name="minutes" label="Minutes" InputProps={{ inputProps: { min: 0, max: 59 } }} />
      <TextField type="number" name="seconds" label="Seconds" InputProps={{ inputProps: { min: 0, max: 59 } }} />
      <Button type="submit" variant="contained" color="primary" >Set Alarm</Button>
    </form>
  );
}

export default AlarmSetter;
