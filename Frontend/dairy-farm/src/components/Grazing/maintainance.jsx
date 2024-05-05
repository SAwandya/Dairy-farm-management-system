import React from 'react';
import { Typography, Button } from '@mui/material';

function AlarmPage() {
   
  
const handleToggleAlarm = () => {
    
     if (alarmJob) {
        
        alarmJob.cancel();
        console.log('Alarm disabled');
    } else {
        
        const alarmSchedule = '0 8 * * *'; // Schedule for 8:00 AM every day
        alarmJob = schedule.scheduleJob(alarmSchedule, function() {
            sendPastureMaintenanceAlarm();
        });
        console.log('Alarm enabled');
    }
};


    return (
        <div>
            <Typography variant="h3">Pasture Maintenance Alarm</Typography>
            <Typography variant="body1">Status: Active</Typography>
            <Button variant="contained" onClick={handleToggleAlarm}>Toggle Alarm</Button>
        </div>
    );
}

export default AlarmPage;
