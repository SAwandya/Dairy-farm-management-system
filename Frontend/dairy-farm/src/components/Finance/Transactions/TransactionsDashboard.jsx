import { Box } from '@mui/material';
import React from 'react';
import WelcomeCard from '../DashboardContent/Welcome/WelcomeCard'
import '../../../styles/Finance/MainDashboard/DashboardContent.css'

function TransactionsDashboard() {
    return (
        <Box className="dashboard-content">
            <WelcomeCard/>
        </Box>
    );
  }
  
  export default TransactionsDashboard;