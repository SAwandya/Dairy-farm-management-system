import React from 'react';
import { Box, Typography } from '@mui/material';

const SmallTank = ({ tankID, levelPercentage }) => {
  return (
    <Box>
        <Typography
            sx={{
                fontFamily: 'Poppins',
                marginTop: '6px'
            }}
        >{tankID}</Typography>
        <Box
            sx={{
                position: 'relative',
                width: '420px',
                height: '46px',
                borderRadius: '10px',
                overflow: 'hidden'
            }}
        >
            <Box
                sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#D9D9D9',
                }}
            />

            <Box
                sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${levelPercentage}%`,
                height: '100%',
                backgroundColor: '#74C6A8',
                }}
            />

            <Typography
                sx={{
                    fontFamily: 'Poppins',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '1.5em',
                    fontWeight: 'bold',
                    color: '#000',
                    zIndex: 1,
                }}
            >{`${levelPercentage}%`}</Typography>
        </Box>

    </Box>
    
  );
};

export default SmallTank;
