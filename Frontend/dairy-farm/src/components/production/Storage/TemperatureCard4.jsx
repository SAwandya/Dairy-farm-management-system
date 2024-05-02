import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { borderRadius } from '@mui/system';
import alarmSound from '../../../assets/alarm.mp3';
import entry from '../../../assets/entry.mp3';
import axios from 'axios';

function TemperatureDisplay() {
  const [temperature, setTemperature] = useState(null);
  const [exceedsLimit, setExceedsLimit] = useState(false);
  const [status, setStatus] = useState('Sensors Inactive!');
  const [alarmTriggered, setAlarmTriggered] = useState(false);
  const tempLimit =33+4;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/temperatureSendRcv/data');
        const { temperature } = response.data;
        setTemperature(temperature);
        setExceedsLimit(temperature > tempLimit); 
        setStatus('Sensors Active');
      } catch (error) {
        setStatus('Sensors Inactive!');
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 1000); // Fetch data every second

    return () => clearInterval(intervalId); // Clean up the interval

  }, []); // run only once - empty arrays

  useEffect(() => {
    // Trigger alarm 
    if (exceedsLimit) {
      setAlarmTriggered(true);
    } else {
      setAlarmTriggered(false);
    }
  }, [exceedsLimit]); // Run effect when exceedsLimit 

  useEffect(() => {
    // Play the alarm sound when triggered
    if (alarmTriggered) {
      const audio = new Audio(alarmSound);
      audio.play();
    }
  }, [alarmTriggered]);

  return (
    <Card sx={{ maxWidth: 345, 
                margin: '20px' , 
                borderRadius:5 ,
               // backgroundColor: temperature > 31 ? '#ffcccc' : 'inherit', // Change background color based on temperature
                border: temperature ? (temperature > tempLimit ? '5px solid red' : '5px solid blue') : '5px solid black',
                backgroundColor: temperature && temperature > tempLimit ? '#ffcccc' : '#C4E4FF',
    }}>
      <CardContent>
        <Typography align="center" variant="h5" component="h2">
          Storeroom 4
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
            sx={{ color: temperature && temperature > tempLimit ? 'red' : 'inherit' }}>{temperature !== null ? temperature.toFixed(1) : 'N/A'} °c</Typography>
          ) : (
            <CircularProgress />
          )}
        </div>

        <Typography align="center" variant="h5" component="h2">Temperature Range: 20-33</Typography>
        <Typography align="center" variant="h6" component="h2" 
                    sx={{ margin: '10px 0', 
                          color: status === 'Sensors Inactive!' ? 'red' : 'gray'}}> 
                          Status: {status} 
        </Typography>        
        {exceedsLimit && (
          <Typography align="center" variant="h6" component="h3" sx={{ color: 'red', marginTop: '10px' }}>
            Temperature exceeds limit!
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default TemperatureDisplay;
