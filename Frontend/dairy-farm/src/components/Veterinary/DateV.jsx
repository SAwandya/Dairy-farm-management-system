import { Box, Icon } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

//dubini

function DateV() {
    return (
        <Box className="date-container" style={{ 
            marginTop: '-30px'
        }}>
            <Typography variant="h4" className='date-text'>Today:</Typography>
            <Box className="calendar-container"> 
                <CalendarMonthIcon 
                    sx={{
                        width: '40px',
                        height: '40px',
                        marginRight: '12px'
                    }}
                />
                <Typography variant="h1" className='date-value'>20/03/2024</Typography>
            </Box>
        </Box>
    );
  }
  export default DateV;