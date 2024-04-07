

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
//import { makeStyles } from "@mui/styles";

/*
const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: '20px',
  },
  circle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: '50%',
    backgroundColor: '#ccc',
    margin: 'auto',
    marginBottom: '20px',
  },
});  */

function TemperatureDisplay() {
    /*
  const classes = useStyles();
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000'); // Connect to WebSocket server

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
  }, []);  */

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Storeroom 1
        </Typography>
        <div className={classes.circle}>
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

