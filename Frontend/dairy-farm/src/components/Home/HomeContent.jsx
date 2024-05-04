import React from 'react';
import { Container, Box } from '@mui/material';
import Section1 from "./Section1"
import Section2 from './Section2';

function HomeContent() {
    return (
        <Box
            sx={{
                paddingLeft: '140px',
                paddingRight: '140px'
            }}
        >
           <Section1 />
           <Section2 />
        </Box>
    );
}

export default HomeContent;