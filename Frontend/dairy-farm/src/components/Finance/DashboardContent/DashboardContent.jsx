import { Box } from '@mui/material';
import React from 'react';
import WelcomeCard from './Welcome/WelcomeCard'
import ThreeCards from './Cards/ThreeCards';
import Graph from './Cards/Graph';
import { PieChart } from '@mui/x-charts';
import MyPieChart from './Cards/MyPieChart';
import '../../../styles/Finance/MainDashboard/DashboardContent.css'

function DashboardContent() {
    return (
        <Box className="dashboard-content">
            <WelcomeCard/>
            <ThreeCards/>
        <div className="graph-container">
        <Graph />
        <MyPieChart />
      </div>
        </Box>
    );
  }
  
  export default DashboardContent;