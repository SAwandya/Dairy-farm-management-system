import React from 'react';
import { Card, Paper, Typography, LinearProgress, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

function ProcessCardContainer() {
  // Sample data representing ongoing processes
  const processes = [
    { id: 1, topic: 'Pasteurization', amount: 500, status: 'mixing', progress: 50, timeRemaining: '2 hours' },
    { id: 2, topic: 'Homogenization', amount: 300, status: 'churning', progress: 75, timeRemaining: '1 hour' },
    { id: 3, topic: 'Packaging', amount: 200, status: 'filling', progress: 25, timeRemaining: '3 hours' },
    { id: 2, topic: 'Homogenization', amount: 300, status: 'churning', progress: 75, timeRemaining: '1 hour' },
    { id: 2, topic: 'Homogenization', amount: 300, status: 'churning', progress: 75, timeRemaining: '1 hour' },
  ];

  return (
    
    <Paper style={{ maxHeight: '85%',width: '100%' ,overflow: 'auto', background: 'rgba(255, 255, 255, 0.0)', padding: '10px' }}>
        <Typography variant="h4" align="center">Ongoing Processes</Typography>
        <Stack spacing={2}>
        {/* Render cards for each ongoing process */}
        {processes.map(process => (
          <Grid key={process.id} item xs={12}>   {/*Each card takes full width */}
            <Card sx={{ borderRadius: 5, width: '90%', background: 'rgba(255, 255, 255, 0.8)',ml:4 }}>
              {/* Content of the process card */}
              <div style={{ padding: '10px' }}>
                <Typography variant="h4">{process.topic}</Typography>
                <Typography>Amount: {process.amount} liters</Typography>
                <Typography>Status: {process.status}</Typography>
                <LinearProgress variant="determinate" value={process.progress} />
                <Typography>Time Remaining: {process.timeRemaining}</Typography>
              </div>
            </Card>
          </Grid>
        ))}
    </Stack>
    </Paper>
  );
}

export default ProcessCardContainer;
