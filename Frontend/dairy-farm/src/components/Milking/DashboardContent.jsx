import { Box } from '@mui/material';
import React from 'react';
import Welcome from './Welcome'
import MainStatistics from './MainStatistics';

function DashboardContent() {
    return (
        <Box className="dashboard-content">
            <Welcome/>
            <MainStatistics/>
        </Box>
    );
  }
  
  export default DashboardContent;