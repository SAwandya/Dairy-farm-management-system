import { Box, Icon } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function DateComponent() {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            setCurrentDate(formattedDate);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box className="date-container">
            <Typography variant="h4" className='date-text'>Today:</Typography>
            <Box className="calendar-container">
                <CalendarMonthIcon 
                    sx={{
                        width: '40px',
                        height: '40px',
                        marginRight: '12px'
                    }}
                />
                <Typography variant="h1" className='date-value'>{currentDate}</Typography>
            </Box>
        </Box>
    );
}
  
export default DateComponent;
