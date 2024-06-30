import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid,Container } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Dot,ReferenceLine } from 'recharts'; // Import Dot from recharts
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
        setStatus('Sensors Activated');
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
     
      <g>
      {/* line */}
      <line x1={cx} y1={cy} x2={cx - 120} y2={cy} stroke={stroke} strokeWidth="2" />
      {/* Dot */}
      <circle cx={cx + 5} cy={cy} r={5} fill={stroke} />
      </g>
     
     /*DOT
       <svg x={cx - 5} y={cy - 5} width={10} height={10} fill={stroke} viewBox="0 0 24 24">
       <circle cx="12" cy="12" r="12" stroke={stroke} strokeWidth="2" fill={stroke} />
       </svg> 
      */

    
    );
  };  


  const renderGraphCard = (title, dataKey, color, unit, horizontalLineValue) => (
  <Card sx={{ width: 350,height:350, margin: '10px', borderRadius: 5, border: '2px solid black' }}>
    <CardContent>
      <LineChart width={300} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0,100]}/>
        <Tooltip />
        <ReferenceLine y={horizontalLineValue} stroke="black" strokeDasharray="3 3" />
        <Line type="monotone" dataKey={dataKey} stroke={color} dot={<CustomDot />} /> 
      </LineChart>
      <Typography align="center" variant="h6" component="h2" sx={{ marginTop: '10px', color }}>
        {title}: {data.length > 0 && data[data.length - 1][dataKey]} {unit}
      </Typography>
    </CardContent>
  </Card>
);

    
  
  return (
    <Container >
      <Grid container justifyContent="center" spacing={2}sx={{ml:3}}>
      <Grid item>{renderGraphCard('Temperature', 'temperature', 'red', '°C', 25, 'red')}</Grid>
<Grid item>{renderGraphCard('Humidity', 'humidity', 'blue', '%', 85, 'blue')}</Grid>
<Grid item>{renderGraphCard('Moisture', 'moisture', 'green', '%', 15, 'green')}</Grid>

      </Grid>
      <Typography align="center" variant="h6" component="h2" sx={{ margin: '10px 0',mt:8, color: status === 'Sensors Inactive!' ? 'red' : 'black' }}>
        Status: {status}
      </Typography>
    </Container>
  
  
);
}

export default SensorDisplay;
