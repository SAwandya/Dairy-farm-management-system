import { Box } from '@mui/material';
import React from 'react';
import Welcome from './Welcome'
import InventoryChart from './InventoryChart';
import MainStatistics from './MainStatistics';
import Inventory from './Inventory';
import '../../styles/supply.css'

function InventoryContent() {
    return (
        <Box className="dashboard-content-supply">
            <Welcome/>

            <Box className="dashboard-content-supply">
                <InventoryChart/>
            </Box>
            
            <Box className="dashboard-content-supply">
                <Inventory/>
            </Box>
        </Box>
    );
}
  
export default InventoryContent;