import { Box} from '@mui/material';
import React from 'react';
import SessionsTable from './SessionsTable';
import AddTankButton from './AddTankButton';

function StorageContent() {
    return (
        <Box className="dashboard-content">
            <AddTankButton/>
            <SessionsTable/>
        </Box>
    );
  }
  
  export default StorageContent;