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

            {/* <h2 style={{ marginLeft: '120px'}}>Summary</h2>
            <Box className="dashboard-content-supply" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
                <div style={{ width: '300px', height: '300px' }}>
                    <ItemDistributionChart/>
                </div>
                <div style={{ width: '250px', height: '250px' }}>
                    <OrderStatusDistributionChart />
                </div>
                <div style={{ width: '300px', height: '300px' }}>
                    <SupplierOrderCountChart/>
                </div>
            </Box> */}
        </Box>
    );
  }
  
  export default OrderContent;