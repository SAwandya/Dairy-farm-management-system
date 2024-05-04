import { Box, Icon } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function GrazingDate() {
    
    const currentDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

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

export default GrazingDate;
