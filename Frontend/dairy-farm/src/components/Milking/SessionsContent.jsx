import { Box } from '@mui/material';
import React from 'react';
import SessionsTable from './SessionsTable'

function SessionsContent() {
    return (
        <Box className="dashboard-content">
            <SessionsTable/>
        </Box>
    );
  }
  
  export default SessionsContent;