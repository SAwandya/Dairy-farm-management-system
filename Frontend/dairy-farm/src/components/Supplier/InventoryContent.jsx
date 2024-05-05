import { Box } from '@mui/material';
import React from 'react';
import Welcome from './Welcome'
import InventoryChart from './InventoryChart';
import MainStatistics from './MainStatistics';
import Inventory from './Inventory';
import '../../styles/supply.css'
import ItemDistributionChart from './ItemDistributionChart';
import OrderStatusDistributionChart from './OrderStatusDistributionChart';
import SupplierOrderCountChart from './SupplierOrderCountChart';

function InventoryContent() {
    return (
        <Box className="dashboard-content-supply">
            <Welcome/>

            <Box className="dashboard-content-supply">
                <InventoryChart/>
            </Box>

            <h2 style={{ marginLeft: '130px'}}>Order Summary</h2>
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
            </Box>
            
            <Box className="dashboard-content-supply">
                <Inventory/>
            </Box>
        </Box>
    );
}
  
export default InventoryContent;