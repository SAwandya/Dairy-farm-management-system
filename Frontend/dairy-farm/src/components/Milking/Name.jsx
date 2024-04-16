import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';

function Name() {
    return (
      <Box className="welcome-name" sx={{ margin: "100px" }}>
        <Typography variant="h4" className="welcome-text">
          Welcome Back!
        </Typography>
        <Typography variant="h1" className="welcome-name-value">
          Mr. Shehan Wickramasooriya
        </Typography>
      </Box>
    );
  }
  
export default Name;