import React, { useState, useEffect } from 'react';
import { Card, Paper, Typography, LinearProgress, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';

const preparationTimes = {
  'Chocolate Icecream': 3,
  'Vanilla Icecream': 2,
  'Yoghurt': 2,
  'Milk': 1
};

const stageTimes = {

  'Mixing': 0.3,
  'Pasteurization': 0.7,
  'Homogenization': 1,
  'Freezing':36000 
  
};

function ProcessCardContainer() {
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000); // Fetch data every second (adjust as needed)
  
    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/processCrud/processes');
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

      const filteredProcesses = response.data.filter(process => {

        if (process.status === 'started') {
          const startDate = new Date(process.startTime).toISOString().split('T')[0]; // Get start date of the process
          
          if (startDate === currentDate) {
            return true; // Show processes started today
          } 
          
          else {
            return false; // Hide other processes
          }
        }
        
        else if (process.status === 'scheduled' ) 
        {
          const [scheduleHours, scheduleMinutes] = process.scheduleTime.split(':').map(Number);

          // Get start date of the process
          const schDate = new Date(process.scheduleDate).toISOString().split('T')[0]; 
          
          // Get current time
          const currentTime = new Date();
          const currentHours = currentTime.getHours()
          const currentMinutes = currentTime.getMinutes() 
          //console.log('sch time',scheduleHours,scheduleMinutes);
          console.log('cur time ',currentHours,currentMinutes);

          if ((schDate === currentDate &&
             (currentHours > scheduleHours || 
            ( currentHours === scheduleHours && currentMinutes >= scheduleMinutes))))
          {
            return true; // Show processes scheduled for today
          }
          else
          {
            return false; // Hide other processes
          }

        }
        else{
          return false; // Hide other processes
        }
    
    });


      const updatedProcesses = filteredProcesses.map(process => {
        const startTime = new Date(process.startTime); // Convert start time string to Date object
        const currentTime = new Date(); // Current time
        const elapsedTime = currentTime - startTime; // Elapsed time since start
        const stage = getCurrentStage(elapsedTime);
        const totalTime =  20 * 60 * 1000; // Total time in milliseconds
        let remainingTime;
        let timeRemaining;
        let progress;
        let isCompleted;
  
        if (elapsedTime >= totalTime) {
          remainingTime = 0;
          timeRemaining = 'Completed!';
          progress = 100;
          isCompleted = true;
        } else {
          remainingTime = totalTime - elapsedTime; // Remaining time for the process
          timeRemaining = formatTime(remainingTime); // Format remaining time
          progress = (elapsedTime / totalTime) * 100; // Calculate progress
          isCompleted = false;
        }
  
        return { ...process, stage, timeRemaining, progress, isCompleted };
      });
      setProcesses(updatedProcesses);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const getCurrentStage = (elapsedTime) => {
    let totalElapsedTime = elapsedTime;
    let currentStage = null;
    for (const [stage, time] of Object.entries(stageTimes)) {
      if (totalElapsedTime <= time * 60 * 1000) {
        currentStage = stage;
        break;
      }
      totalElapsedTime -= time * 60 * 1000;
    }
    return currentStage;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / (1000 * 60));
    const seconds = Math.floor((time / 1000) % 60);
    return `${minutes} min ${seconds} sec`;
  };

  return (
    <div style={{ marginTop: '20px', maxHeight: '70vh', overflowY: 'auto', padding: 0 }}>
      <Paper sx={{ maxWidth: '100%', height: '100%', background: 'rgba(25, 255, 255, 0.0)', ml: 2, overflowY: 'hidden', padding: 0 }}>
        <Stack spacing={2}>
          {processes.map(process => (
            <Grid key={process.id} item xs={12}>
              <Card sx={{ borderRadius: 5, width: '94%', background: process.isCompleted ? 'lightgreen' : 'rgba(255, 255, 255, 0.8)', ml: 2 }}>
                <div style={{ padding: '10px' }}>
                  <Typography variant="h4">{process.product}</Typography>
                  <Typography>Amount: {process.milkQuantity} liters</Typography>
                  <Typography>Current Stage: {process.stage}</Typography>
                  <Typography>Status: {process.status}</Typography>
                  <LinearProgress variant="determinate" value={process.progress} sx={{ height: 10, width: '75%' }} />
                  <Typography>Time Remaining: {process.timeRemaining}</Typography>
                </div>
              </Card>
            </Grid> 
          ))}
        </Stack>
      </Paper>
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default ProcessCardContainer;
