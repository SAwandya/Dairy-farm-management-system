import { Box} from '@mui/material';
import React from 'react';
import SessionsTable from './SessionsTable';
import ScheduleButton from './ScheduleButton';

function SessionsContent() {
    return (
        <Box className="dashboard-content">
            <ScheduleButton/>
            <SessionsTable/>
        </Box>
    );
  }
  
  export default SessionsContent;