import { Box} from '@mui/material';
import React from 'react'
import MilkingDataTable from './MilkingDataTable'

function MilkingDataContent() {
    return (
        <Box className="dashboard-content">
            <MilkingDataTable />
        </Box>
    );
  }
  
  export default MilkingDataContent;