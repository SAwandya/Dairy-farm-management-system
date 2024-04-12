import React, { useState, useEffect } from 'react';
import { Card, Paper, Typography, LinearProgress, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';

// Define preparation times for each product (in minutes)
const preparationTimes = {
  'Chocolate Icecream': 3,
  'Vanilla Icecream': 2,
  'Yoghurt': 2,
  'Milk': 1
};

// Define time for each stage (in minutes)
const stageTimes = {
  'Mixing': 2,
  'Pasteurization': 1,
  'Homogenization': 3,
  'Cooling': 2,
  'Aging': 3,
  'Freezing': 9,
  'Packaging': 1
};

function ProcessCardContainer() {
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000); // Fetch data every minute (adjust as needed)
  
    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/processCrud/processes');
      // Filter processes where status is "started"
      const startedProcesses = response.data.filter(process => process.status === 'started');
      // Calculate time remaining for each process
      const updatedProcesses = startedProcesses.map(process => {
       // console.log('Start Time:', process.startTime); 
        const startTime = new Date(process.startTime); // Convert start time string to Date object
        //console.log('Current Time:', new Date()); 
        const currentTime = new Date(); // Current time
        const elapsedTime = currentTime - startTime; // Elapsed time since start
        //console.log('Elapsed Time (ms):', elapsedTime); 
       // const preparationTime = preparationTimes[process.product] * 60 * 1000; // Convert preparation time to milliseconds
       // console.log('Preparation Time (ms):', preparationTime);
        const stage = getCurrentStage(elapsedTime);
        //console.log('Stage:', stage);  preparationTime +
        const totalTime =  stageTimes[stage] * 60 * 1000; // Total time in milliseconds
        console.log('total Time (ms):', totalTime);
        const remainingTime = totalTime - elapsedTime; // Remaining time for the process
        const timeRemaining = formatTime(remainingTime); // Format remaining time
        const progress = (elapsedTime / totalTime) * 100;

        return { ...process, stage, timeRemaining, progress };
      });
      setProcesses(updatedProcesses);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  // Function to calculate the current stage based on elapsed time
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

  // Function to format remaining time
  const formatTime = (time) => {
    // Convert milliseconds to minutes and seconds
    const minutes = Math.floor(time / (1000 * 60));
    const seconds = Math.floor((time / 1000) % 60);
    return `${minutes} min ${seconds} sec`;
  };

  return (
    <div style={{ marginTop: '20px', maxHeight: '70vh', overflowY: 'auto', padding: 0 }}>
      <Paper sx={{ maxWidth: '100%', height: '100%', background: 'rgba(25, 255, 255, 0.0)', ml: 2, overflowY: 'hidden', padding: 0 }}>
        <Stack spacing={2}>
          {/* Render cards for each ongoing process */}
          {processes.map(process => (
            <Grid key={process.id} item xs={12}>
              {/* Each card takes full width */}
              <Card sx={{ borderRadius: 5, width: '94%', background: 'rgba(255, 255, 255, 0.8)', ml: 2 }}>
                {/* Content of the process card */}
                <div style={{ padding: '10px' }}>
                  <Typography variant="h4">{process.product}</Typography>
                  <Typography>Amount: {process.milkQuantity} liters</Typography>
                  <Typography>Current Stage: {process.stage}</Typography>
                  {/* Add other relevant information here */}
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
        /* Hide scrollbar */
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default ProcessCardContainer;
