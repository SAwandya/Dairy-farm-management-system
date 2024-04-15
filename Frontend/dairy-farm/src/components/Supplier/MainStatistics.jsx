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
            >Supplier Overview</Typography>

            <Box className="stat-cards-container">
                <StatsCard
                    title='Total'
                    value='10'
                    icon='../../../src/assets/icon1.png'

                />
                <StatsCard
                    title='Contracted'
                    value='8'
                    icon='../../../src/assets/icon1.png'
                />
                <StatsCard
                    title='Permanent'
                    value='2'
                    icon='../../../src/assets/icon2.png'
                />
            </Box>
        </Box>
    );
}

export default MainStatistics;