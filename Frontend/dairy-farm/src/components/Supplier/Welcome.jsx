import { Box } from '@mui/material';
import React from 'react';
import Name from "./Name"
import Date from "./Date"

function Welcome() {
    return (
        <Box className="welcome-header">
            <Name />
            <Date />
        </Box>
    );
}

export default Welcome;