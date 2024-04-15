
import { Box } from '@mui/material';
import React from 'react';
import { Typography,Stack} from '@mui/material';
import StatsCard from './StatsCard';

function MainStatistics() {
    return (
        <Box>
            <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                    mb:2,
                    ml:1
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