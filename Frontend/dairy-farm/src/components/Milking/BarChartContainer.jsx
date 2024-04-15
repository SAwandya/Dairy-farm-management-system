import React from 'react';
import MilkingBarChart from './MilkingBarChart';
import { Box, Typography } from '@mui/material';

function BarChartContainer({ selectedOption }) {
    
    const timePeriodText = {
        last7days: 'Past 7 Days',
        lastMonth: 'Past Month',
        last6months: 'Past 6 Months'
    };

    return (
        <Box className="chart-card-container">
            <Typography
                variant="h3"
                className='graph-card-title'
                sx={{
                    fontSize: '18px',
                    fontWeight: '600',
                }}
            >Collected Litres of Raw Milk</Typography>
            <Typography
                variant="h3"
                className='graph-card-subtitle'
                sx={{
                    fontSize: '16px',
                    fontWeight: '400',
                    marginTop: '8px'
                }}
            >
                {timePeriodText[selectedOption]}
            </Typography>
            <MilkingBarChart selectedTimePeriod={selectedOption} />
        </Box>
    )
}

export default BarChartContainer;
