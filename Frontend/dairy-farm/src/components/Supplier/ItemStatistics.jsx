import { Box } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';
import StatsCard from './StatsCard';

function ItemStatistics() {
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
            >Item Overview</Typography>

            <Box className="stat-cards-container">
                <StatsCard
                    title='High Priority'
                    value='10'
                    icon='../../../src/assets/icon1.png'

                />
                <StatsCard
                    title='Medium Priority'
                    value='8'
                    icon='../../../src/assets/icon1.png'
                />
                <StatsCard
                    title='Low Priority'
                    value='2'
                    icon='../../../src/assets/icon2.png'
                />
            </Box>
        </Box>
    );
}

export default ItemStatistics;