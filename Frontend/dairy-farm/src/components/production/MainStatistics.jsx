
import { Box } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';
import StatsCard from './StatsCard';

function MainStatistics() {
    return (
        <Box>
            <Typography
                variant="h3"
                className='main-stats-title'
                sx={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginTop: '20px'
                }}
            >Today's Main Statistics</Typography>

            <Box className="stat-cards-container">
                <StatsCard
                    title='Total Sessions'
                    value='10'
                    icon='../../../src/assets/icon1.png'
                />
                <StatsCard
                    title='Completed Sessions'
                    value='8'
                    icon='../../../src/assets/icon1.png'
                />
                <StatsCard
                    title='Total Milk Collected'
                    value='1000L'
                    icon='../../../src/assets/icon2.png'
                />
                <StatsCard
                    title='Amount of Tanks'
                    value='2'
                    icon='../../../src/assets/icon3.png'
                />
            </Box>
        </Box>
    );
}

export default MainStatistics;