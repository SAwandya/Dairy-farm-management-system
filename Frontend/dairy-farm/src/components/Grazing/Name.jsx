import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';

function Name() {
    return (
        <Box className="welcome-name">
        <Typography variant="h4" className="welcome-text">
          Welcome Back!
        </Typography>
        <Typography variant="h1" className="welcome-name-value">
          Ms. Janithya Imalki
        </Typography>
      </Box>
    );
  }
  
export default Name;