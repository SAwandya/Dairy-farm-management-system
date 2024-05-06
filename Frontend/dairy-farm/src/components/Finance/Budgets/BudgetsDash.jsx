import { Box } from '@mui/material';
import React from 'react';
import WelcomeCard from '../../../components/Finance/DashboardContent/Welcome/WelcomeCard'
import '../../../styles/Finance/MainDashboard/DashboardContent.css'

function BudgetDash() {
    return (
        <Box className="dashboard-content">
            <WelcomeCard />
        </Box>
    );
  }
  
  export default BudgetDash;