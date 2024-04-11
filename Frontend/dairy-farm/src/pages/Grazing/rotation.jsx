import React, { useState, useEffect } from "react";
import "../../components/Grazing/GrazingSideBar";
import alarmSound from "../../assets/clock.mp3";
import "../../styles/Grazing/AlarmScheduler.css"; // Import CSS file for styling

function AlarmScheduler() {
  const [feedCowsAlarm, setFeedCowsAlarm] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      checkAlarmTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const checkAlarmTime = () => {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const currentTimeInMilliseconds = currentHour * 3600000 + currentMinute * 60000;

    if (feedCowsAlarm) {
      const [alarmHour, alarmMinute] = feedCowsAlarm.split(":");
      const alarmTimeInMilliseconds = parseInt(alarmHour) * 3600000 + parseInt(alarmMinute) * 60000;

      if (alarmTimeInMilliseconds === currentTimeInMilliseconds) {
        ringAlarm("Feed the cows!");
      }
    }
  };

  const ringAlarm = (message) => {
    alert(message); // Display alert message
    playAlarmSound(); // Play alarm sound
  };

  const playAlarmSound = () => {
    const audio = new Audio(alarmSound);
    audio.play();
  };

  const setFeedCowsTime = (event) => {
    const selectedTime = event.target.value;
    setFeedCowsAlarm(selectedTime);
    alert(`Feed cows alarm set for: ${selectedTime}`);
  };

  return (
    <div className="alarm-scheduler">
      <h2>Alarm Scheduler</h2>
      <div className="clock">{currentTime}</div>
      <div className="task-alarms">
        <div className="task-alarm">
          <h3>Feed Cows</h3>
          <input
            type="time"
            value={feedCowsAlarm}
            onChange={setFeedCowsTime}
          />
        </div>
      </div>
    </div>
  );
}

export default AlarmScheduler;
