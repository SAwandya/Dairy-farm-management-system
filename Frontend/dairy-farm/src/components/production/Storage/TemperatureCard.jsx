import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { borderRadius } from '@mui/system';

function TemperatureDisplay() {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3030'); // Connect to WebSocket server

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received temperature update:', data.temperature);
      setTemperature(data.temperature);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <Card sx={{ maxWidth: 345, margin: '20px' }}>
      <CardContent>
        <Typography align="center" variant="h5" component="h2">
          Storeroom 1
        </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: '#ccc',
            margin: 'auto',
            marginBottom: '20px',
          }}
        >
          {temperature !== null ? (
            <Typography variant="h4">{temperature} °C</Typography>
          ) : (
            <CircularProgress />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default TemperatureDisplay;
