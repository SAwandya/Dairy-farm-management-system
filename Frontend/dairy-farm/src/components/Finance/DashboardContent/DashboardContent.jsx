import { Box } from '@mui/material';
import React from 'react';
import WelcomeCard from './Welcome/WelcomeCard'

function DashboardContent() {
    return (
        <Box className="dashboard-content">
            <WelcomeCard/>
        </Box>
    );
  }
  
  export default DashboardContent;