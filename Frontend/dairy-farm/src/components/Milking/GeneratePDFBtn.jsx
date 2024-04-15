import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function GeneratePDFBtn() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/scheduleForm');
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
                    borderRadius: '15px',
                    marginTop: '20px'
                }}
                onClick={handleClick}
            >
                Generate PDF
            </Button>
        </Box>
    )
}

export default GeneratePDFBtn;