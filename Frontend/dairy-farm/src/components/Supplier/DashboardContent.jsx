import { Box } from '@mui/material';
import React from 'react';
import Welcome from './Welcome'
import MainStatistics from './MainStatistics';
import SupplierTable from './suppliertable';
import '../../styles/supply.css'


function DashboardContent() {
    return (
        <Box className="dashboard-content">
            <Welcome/>

            <Box className="dashboard-content">
                <MainStatistics/>

            </Box>
            
            <Box className="dashboard-content">
                <SupplierTable/>

            </Box>
        </Box>
    );
  }
  
  export default DashboardContent;