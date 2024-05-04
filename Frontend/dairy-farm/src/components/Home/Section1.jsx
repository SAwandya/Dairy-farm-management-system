import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';

function Section1() {
    return (
        <Box
            sx={{
                display: 'flex'
            }}
        >
            <Box
                sx={{
                }}
            >
                <Typography
                    variant='h2'
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: '600',
                        color: '#38775B',
                        textAlign: 'left',
                        fontSize: '70px',
                        width: '70%',
                        marginTop: '108px'
                    }}
                >
                    Our Passion for Agriculture Nurturing Growth and Sustaining the Future
                </Typography>
                <Typography
                    variant='h6'
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: '400',
                        color: '#000',
                        textAlign: 'left',
                        width: '70%',
                        fontSize: '14px',
                        marginTop: '20px'
                    }}
                >
                    Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular.
                </Typography>
                <Button
                    sx={{
                        backgroundColor: '#38775B',
                        color: '#fff',
                        border: '1px solid #38775B',
                        marginTop: '20px',
                        fontFamily: 'Poppins',
                        paddingRight: '30px',
                        paddingLeft: '30px'
                    }}
                >
                    Get Started
                </Button>
            </Box>
            <img src="../../../../src/assets/section1.png" alt="cows" width={'500px'} height={'500px'} className='section1-img'/>
        </Box>
    );
}

export default Section1;