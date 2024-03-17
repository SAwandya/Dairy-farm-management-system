import React from "react";
import { Box, Typography } from '@mui/material';
import SmallTank from './SmallTank'

function TankStausCard() {
    return (
        <Box className="chart-card-container">
            <Typography
                variant="h3"
                className='tank-card-title'
                sx={{
                    fontSize: '18px',
                    fontWeight: '600',
                }}
            >Tank Status</Typography>
            <SmallTank tankID='#tank001' levelPercentage='60'/>
            <SmallTank tankID='#tank002' levelPercentage='80'/>
            <SmallTank tankID='#tank003' levelPercentage='0'/>
            <SmallTank tankID='#tank004' levelPercentage='20'/>
            <SmallTank tankID='#tank005' levelPercentage='50'/>
        </Box>
    );
  }
  
  export default TankStausCard;