import { Box } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';

function StatsCard({ title, value, icon }) {
    return (
        <Box className='stat-card-container' sx={{ width: '300px', height: '150px', borderRadius: '30px', 
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
        position: 'relative',margin: '0 30px' }}>
            <Box className='stat-card-texts' sx={{ width: '100%', textAlign: 'left' }}>
                <Typography
                    variant="h4"
                    className='stat-card-title'
                    sx={{
                        fontFamily: 'Poppins',
                        color: '#A0AEC0',
                        fontWeight: '700',
                        fontSize: '16px',
                    }}
                >{title}</Typography>
                <Typography
                    variant="h2"
                    className='stat-card-value'
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: '700',
                        fontSize: '24px',
                        marginTop: '2px',
                    }}
                >{value}</Typography>
            </Box>
            <Box className="stat-card-icon" sx={{ position: 'absolute', top: '35px', right: '25px' }}>
                <img src={icon} alt='icon' style={{ width: '75px', height: 'auto' }} />
            </Box>
        </Box>
    );
}

export default StatsCard;
