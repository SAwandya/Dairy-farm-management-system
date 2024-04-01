import { Box } from '@mui/material';
import React from 'react';
import Welcome from './Welcome'
import ItemTable from './ItemTable';
import '../../styles/supply.css'
import ItemStatistics from './ItemStatistics';


function DashboardContent() {
    return (
        <Box className="dashboard-content-supply">
            <Welcome/>

            <Box className="dashboard-content-supply">
                <ItemStatistics/>

            </Box>
            
            <Box className="dashboard-content-supply">
                <ItemTable/>

            </Box>
        </Box>
    );
  }
  
  export default DashboardContent;