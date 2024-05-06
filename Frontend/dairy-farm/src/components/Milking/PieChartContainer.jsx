import React from 'react';
import MilkingPieChart from './MilkingPieChart';
import { Box, Typography } from '@mui/material';

function PieChartContainer({ selectedOption }) {

    const timePeriodText = {
        last7days: 'Past 7 Days',
        lastMonth: 'Past Month',
        last6months: 'Past 6 Months'
    };

    return(
        <Box className="chart-card-container">
            <Typography
                variant="h3"
                className='graph-card-title'
                sx={{
                    fontSize: '18px',
                    fontWeight: '600',
                }}
            >Quality Check Results</Typography>
            <Typography
                variant="h3"
                className='graph-card-subtitle'
                sx={{
                    fontSize: '16px',
                    fontWeight: '400',
                    marginTop: '8px',
                }}
            >{timePeriodText[selectedOption]}</Typography>
            <MilkingPieChart selectedOption={selectedOption} />
        </Box>
    )
}

export default PieChartContainer;