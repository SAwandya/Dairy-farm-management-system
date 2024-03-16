import { Box } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';

function StatsCard({ title, value, icon }) {
    return (
        <Box className='stat-card-container'>
            <Box className='stat-card-texts'>
                <Typography
                    variant="h4"
                    className='stat-card-title'
                    sx={{
                        fontFamily: 'Poppins',
                        color: '#A0AEC0',
                        fontWeight: '700',
                        fontSize: '16px'
                    }}
                >{title}</Typography>
                <Typography
                    variant="h2"
                    className='stat-card-value'
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: '700',
                        fontSize: '24px',
                        marginTop: '2px'
                    }}
                >{value}</Typography>
            </Box>
            <img src={icon} alt='icon'/>
        </Box>
    );
}

export default StatsCard;