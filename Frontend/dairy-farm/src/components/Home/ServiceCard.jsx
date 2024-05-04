import React from 'react';
import { Typography, Box } from '@mui/material';

function ServiceCard({ icon, text }) {
    return (
        <Box
            sx={{
                width: '260px',
                height: '260px',
                backgroundColor: '#fff',
                borderRadius: '20px',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1)'
            }}
        >
            <img src={icon} alt="icon" width={'80px'} className='service-icon'/>
            <Typography
                sx={{
                    fontFamily: 'Poppins',
                    textAlign: 'center',
                    color: '#38775B'
                }}
            >{text}</Typography>
        </Box>
    );
}

export default ServiceCard;