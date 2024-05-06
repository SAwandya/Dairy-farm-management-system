import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import Clock from '../../components/Grazing/Clock';
import AlarmSetter from '../../components/Grazing/AlarmSetter';
import AlarmList from '../../components/Grazing/AlarmList';
import alarmImage from '../../assets/cow1.png';
import alarmSound from '../../assets/alarm.mp3';
import Swal from 'sweetalert2';
import GrazingSideBar from '../../components/Grazing/GrazingSideBar';

function App() {
  const [alarms, setAlarms] = useState([]);
  const [audio, setAudio] = useState(null);

  const addAlarm = (time) => {
    const currentTime = new Date().getTime(); // Current time
    const alarmTime = time.getTime(); // Alarm time in milliseconds

    if (alarmTime <= currentTime) {
      alert("Scheduled time should be in the future.");
      return;
    }

    setAlarms([...alarms, time]);

    // If there's no audio playing, start playing the alarm sound
    if (!audio) {
      const audio = new Audio(alarmSound);
      audio.loop = true;
      audio.play();
      setAudio(audio);
    }

    // Calculate the time difference between the current time and the alarm time
    const timeDifference = alarmTime - currentTime;

    // Show the SweetAlert dialog after the time difference
    setTimeout(() => {
        Swal.fire({
          title: "Session Time ended",
          text: "It's time for you to end grazing session!",
          icon: "success",
          confirmButtonText: "OK",
          onClose: () => {
            stopAlarm();
            window.location.reload();
          },
        });
      }, timeDifference);
    };

  const deleteAlarm = (index) => {
    setAlarms(alarms.filter((_, i) => i !== index));
  };

  const stopAlarm = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0; // Reset the audio to the beginning
      setAudio(null);
    }
    
    // Refresh the page
    window.location.reload();
  };
  
  

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="140"
          image={alarmImage}
          alt="Alarm Image"
        />
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Grazing Time Manager
          </Typography>
          <Clock />
          <AlarmSetter addAlarm={addAlarm} />
          <AlarmList alarms={alarms} deleteAlarm={deleteAlarm} />
        </CardContent>
      </Card>
      <GrazingSideBar />
    </Box>
  );
}

export default App;
