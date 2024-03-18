import { Box } from '@mui/material';
import React from 'react';
import WelcomeCard from './Welcome/WelcomeCard'
import ThreeCards from './Cards/ThreeCards';
import Graph from './Cards/Graph';
import { PieChart } from '@mui/x-charts';

function DashboardContent() {
    return (
        <Box className="dashboard-content">
            <WelcomeCard/>
            <ThreeCards/>
            <Graph />
            {/* <PieChart /> */}
        </Box>
    );
  }
  
  export default DashboardContent;