import { Box } from '@mui/material';
import React from 'react';
import Welcome from './Welcome'
import OrderStatistics from './OrderStatistics';
import OrderTable from './ordertable';
import '../../styles/supply.css'


function OrderContent() {
    return (
        <Box className="dashboard-content-supply">
            <Welcome/>

            <Box className="dashboard-content-supply">
                <OrderStatistics/>

            </Box>
            
            <Box className="dashboard-content-supply">
                <OrderTable/>

            </Box>
        </Box>
    );
  }
  
  export default OrderContent;