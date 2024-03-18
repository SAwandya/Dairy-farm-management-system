import { Box } from '@mui/material';
import React from 'react';
import WelcomeCard from './Welcome/WelcomeCard'
import '../../styles/Finance/MainDashboard/DashboardContent.css'

function TransactionsDashboard() {
    return (
        <Box className="dashboard-content">
            <WelcomeCard/>
        <div className="graph-container">

      </div>
        </Box>
    );
  }
  
  export default TransactionsDashboard;