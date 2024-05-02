import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

function SensorDisplay() {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [moisture, setMoisture] = useState(null);
  const [status, setStatus] = useState('Sensors Inactive!');
  const [exceedsTempLimit, setExceedsTempLimit] = useState(false);
  const tempLimit = 33;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/temperatureSendRcv/data');
        const { temperature, humidity, moisture } = response.data;
        setTemperature(temperature);
        setHumidity(humidity);
        setMoisture(moisture);
        setExceedsTempLimit(temperature > tempLimit);
        setStatus('Sensors Active');
      } catch (error) {
        setStatus('Sensors Inactive!');
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 1000); // Fetch data every second

    return () => clearInterval(intervalId); // Clean up the interval
  }, []);

  return (
    <Card sx={{ maxWidth: 345, margin: '20px', borderRadius: 5, border: '5px solid black' }}>
      <CardContent>
        <Typography align="center" variant="h5" component="h2">
          Sensor Data
        </Typography>
        <Typography align="center" variant="h6" component="h2">
          Temperature: {temperature !== null ? `${temperature.toFixed(1)} °C` : 'N/A'}
        </Typography>
        <Typography align="center" variant="h6" component="h2">
          Humidity: {humidity !== null ? `${humidity.toFixed(1)} %` : 'N/A'}
        </Typography>
        <Typography align="center" variant="h6" component="h2">
          Moisture: {moisture !== null ? `${moisture.toFixed(1)} %` : 'N/A'}
        </Typography>
        <Typography align="center" variant="h6" component="h2" sx={{ margin: '10px 0', color: status === 'Sensors Inactive!' ? 'red' : 'gray' }}>
          Status: {status}
        </Typography>
        {exceedsTempLimit && (
          <Typography align="center" variant="h6" component="h3" sx={{ color: 'red', marginTop: '10px' }}>
            Temperature exceeds limit!
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default SensorDisplay;
