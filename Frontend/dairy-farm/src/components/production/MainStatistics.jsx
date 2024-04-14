
import { Box } from '@mui/material';
import React from 'react';
import { Typography,Stack} from '@mui/material';
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
                    marginTop: '0px',
                    mb:2
                }}
            >Today's Main Statistics</Typography>


            <Stack direction="row" spacing={5}>
                
                    <StatsCard
                    title='Ongoing Processes'
                    value='10'
                    icon='../../../src/assets/icon1.png'/>
                
                    <StatsCard
                    title='Upcoming Processes'
                    value='8'
                    icon='../../../src/assets/icon1.png'/>
                               
                    <StatsCard
                    title='Raw Milk Quantity '
                    value='1000L'
                    icon='../../../src/assets/icon2.png'
                    />
                    
                    <StatsCard
                    title='Temperature Status'
                    value='Normal'
                    icon='../../../src/assets/icon3.png'/>
                


            </Stack>
                
                
               
                
            
        </Box>
    );
}

export default MainStatistics;