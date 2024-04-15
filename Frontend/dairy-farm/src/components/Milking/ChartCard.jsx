import React from 'react';
import StatGraph from './StatGraph';
import { Box, Typography } from '@mui/material';

function ChartCard() {
    return(
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
            >Past 7 Days</Typography>
            <StatGraph/>
        </Box>
    )
}

export default ChartCard;