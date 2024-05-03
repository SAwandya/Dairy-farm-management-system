import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid,Container } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Dot } from 'recharts'; // Import Dot from recharts
import axios from 'axios';

function SensorDisplay() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('Sensors Inactive!');
  const tempLimit = 33;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/temperatureSendRcv/data');
        const { temperature, humidity, moisture } = response.data;
        setData([...data, { temperature, humidity, moisture }]); // Add new data point
        setStatus('Sensors Active');
      } catch (error) {
        setStatus('Sensors Inactive!');
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 1000); // Fetch data every second

    return () => clearInterval(intervalId); // Clean up the interval
  }, []);

  // Custom dot component with increased size and stroke
  const CustomDot = (props) => {
    const { cx, cy, stroke, payload } = props;

    return (
      <svg x={cx - 5} y={cy - 5} width={10} height={10} fill={stroke} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" stroke={stroke} strokeWidth="2" fill="white" />
      </svg>
    );
  };

  const renderGraphCard = (title, dataKey, color) => (
    <Card sx={{ maxWidth: 300, margin: '20px', borderRadius: 5, border: '2px solid black' }}>
      <CardContent>
        <Typography align="center" variant="h6" component="h2">
          {title}
        </Typography>
        <LineChart width={250} height={150} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke={color} dot={<CustomDot />} />
        </LineChart>
      </CardContent>
    </Card>
  );

  return (
    <Container>
    <Grid container justifyContent="center" spacing={2}>
      <Grid item>{renderGraphCard('Temperature', 'temperature', 'red')}</Grid>
      <Grid item>{renderGraphCard('Humidity', 'humidity', 'blue')}</Grid>
      <Grid item>{renderGraphCard('Moisture', 'moisture', 'green')}</Grid>
     
    </Grid>
  <Typography align="center" variant="h6" component="h2" sx={{ margin: '10px 0', color: status === 'Sensors Inactive!' ? 'red' : 'gray' }}>
  Status: {status}
</Typography> 

</Container>
);
}

export default SensorDisplay;
