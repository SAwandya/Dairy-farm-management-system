import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ScheduleButton() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/addNewTank');
      };

    return(
        <Box>
            <Button
                style={{
                    backgroundColor: '#38775B',
                    color: '#fff',
                    width: '100%',
                    fontFamily: 'Poppins, sans-serif',
                    textTransform: 'none',
                    fontWeight: '600',
                    fontSize: '18px',
                    marginBottom: '22px',
                    borderRadius: '15px'
                }}
                onClick={handleClick}
            >
                Add a New Refrigerated Tank
            </Button>
        </Box>
    )
}

export default ScheduleButton;