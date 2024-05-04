import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import alarmSound from '../../assets/alarm.mp3'; // Assuming the alarm sound file is in the 'assets' folder

function AlarmSetter({ alarmType, alarmTime, setAlarm }) {
  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.warn('Notification permission denied.');
        }
      });
    }
  };

  const scheduleAlarm = () => {
    const now = new Date();
    const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, alarmTime.hours, alarmTime.minutes, 0);
    const delay = alarmDate - now;

    setTimeout(() => {
      showNotification(`${alarmType} Alarm`, `It's time for your ${alarmType} rotation!`);
      playAlarmSound();
    }, delay);
  };

  const showNotification = (title, body) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  };

  const playAlarmSound = () => {
    const audio = new Audio(alarmSound); // Corrected the path to the alarm sound file
    audio.play();
  };

  const handleSetAlarm = () => {
    scheduleAlarm();
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <Button variant="contained" color="primary" onClick={handleSetAlarm}>
      Set {alarmType} Rotation Alarm
    </Button>
  );
}

export default AlarmSetter;
