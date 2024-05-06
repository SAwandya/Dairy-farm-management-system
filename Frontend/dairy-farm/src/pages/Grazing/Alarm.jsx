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

  const addAlarm = (time) => {
    setAlarms([...alarms, time]);
    const audio = new Audio(alarmSound);
    audio.loop = true;
    audio.play();

    Swal.fire("Session Time Begun", "It's time for your grazing session!", "success");
  };

  const deleteAlarm = (index) => {
    setAlarms(alarms.filter((_, i) => i !== index));
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
      <GrazingSideBar/>
    </Box>
    
  );
}

export default App;
