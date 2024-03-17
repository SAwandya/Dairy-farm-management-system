import { Box } from '@mui/material';
import React from 'react';
import Welcome from './Welcome'
import MainStatistics from './MainStatistics';
import ChartCard from './ChartCard';
import TankStatusCard from './TankStatusCard';

function DashboardContent() {
    return (
        <Box className="dashboard-content">
            <Welcome/>
            <MainStatistics/>
            <Box className="dashboard-below-container">
                <ChartCard/>
                <TankStatusCard/>
            </Box>
        </Box>
    );
  }
  
  export default DashboardContent;