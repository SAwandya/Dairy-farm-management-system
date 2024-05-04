import React, { useState } from 'react';
import Clock from '../../components/Grazing/Clock';
import AlarmSetter from '../../components/Grazing/AlarmSetter';
import AlarmList from '../../components/Grazing/AlarmList';
import alarm from '../../assets/alarm.mp3';
import Swal from 'sweetalert2';

function App() {
  const [alarms, setAlarms] = useState([]);

  const addAlarm = (time) => {
    setAlarms([...alarms, time]);
    const audio = new Audio(alarm.mp3);
    audio.loop = true;
    audio.play();

    Swal("Session Time Begun", "It's time for your grazing session!", "success");
  };

  const deleteAlarm = (index) => {
    setAlarms(alarms.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Clock />
      <AlarmSetter addAlarm={addAlarm} />
      <AlarmList alarms={alarms} deleteAlarm={deleteAlarm} />
    </div>
  );
}

export default App;
