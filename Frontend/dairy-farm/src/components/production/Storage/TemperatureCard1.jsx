import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { borderRadius } from '@mui/system';

function TemperatureDisplay() {
  const [temperature, setTemperature] = useState(null);
  const [exceedsLimit, setExceedsLimit] = useState(false);
  const [status, setStatus] = useState('Sensors Inactive');


  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3030'); // Connect to WebSocket server

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
      setStatus('Sensors Active');

    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received temperature update:', data.temperature);
      setTemperature(data.temperature);
      setExceedsLimit(data.temperature > 31);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setStatus('Sensors Inactive');

    };

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <Card sx={{ maxWidth: 345, 
                margin: '20px' , 
                borderRadius:5 ,
               // backgroundColor: temperature > 31 ? '#ffcccc' : 'inherit', // Change background color based on temperature
                border: temperature ? (temperature > 31 ? '5px solid red' : '5px solid blue') : '5px solid black',
                backgroundColor: temperature && temperature > 31 ? '#ffcccc' : '#C4E4FF',
    }}>
      <CardContent>
        <Typography align="center" variant="h5" component="h2">
          Storeroom 1
        </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 110,
            height: 110,
            borderRadius: '50%',
            border : '1px solid black',
            backgroundColor: '#ccc',
            margin: 'auto',
            marginBottom: '20px',
          }}
        >
          {temperature !== null ? (
            <Typography align="center"variant="h4"
            sx={{ color: temperature && temperature > 31 ? 'red' : 'inherit' }}>{temperature !== null ? temperature.toFixed(1) : 'N/A'} °c</Typography>
          ) : (
            <CircularProgress />
          )}
        </div>

        <Typography align="center" variant="h5" component="h2">Temperature Range: 20-31</Typography>
        <Typography align="center" variant="h6" component="h2" sx={{ margin: '10px 0', color: ' gray' }}> Status: {status} </Typography>
        {exceedsLimit && (
          <Typography align="center" variant="h6" component="h3" sx={{ color: 'red', marginTop: '10px' }}>
            Temperature exceeds maximum limit!
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default TemperatureDisplay;
