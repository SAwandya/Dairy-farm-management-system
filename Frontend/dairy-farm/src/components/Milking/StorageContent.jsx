import { Box} from '@mui/material';
import React from 'react';
import TankContainer from './TankContainer';
import AddTankButton from './AddTankButton';

function StorageContent() {
    return (
        <Box className="dashboard-content">
            <AddTankButton/>
            <TankContainer/>
        </Box>
    );
  }
  
  export default StorageContent;