import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';

function Section1() {
    return (
        <Box
            sx={{
                display: 'flex'
            }}
        >
            <Box>
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
At Nevil Nutri, we pride ourselves on delivering the finest quality dairy products while upholding the highest standards of animal welfare and environmental sustainability. Nestled amidst the lush greenery of Sri Lanka's picturesque countryside, our farm is a sanctuary where happy, healthy cows roam freely, grazing on nutrient-rich grasslands and basking in the warm tropical sun.

                </Typography>
                <Button
                    sx={{
                        backgroundColor: '#38775B',
                        color: '#fff',
                        border: '1px solid #38775B',
                        marginTop: '20px',
                        fontFamily: 'Poppins',
                        paddingRight: '30px',
                        paddingLeft: '30px',
                        '&:hover': {
                        backgroundColor: '#fff',
                        color: '#38775B'
                        }  
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