
import { Box } from '@mui/material';
import React from 'react';
import Welcome from './Welcome'
import MainStatistics from './MainStatistics';
import ChartCard from './ChartCard';
import TankStatusCard from './TankStatusCard';

function ProcessContent() {
    return (
        <Box className="dashboard-content">
            <Welcome/>
         
            <Box className="dashboard-below-container">
                
                
                
                
            </Box>
        </Box>
    );
  }
  
  export default ProcessContent;