import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';

function HeroSection() {
    return (
        <Box className= "bg-container">
            <img src='../../../../src/assets/homebg2.png' alt="home background" className='home-bg'/>
            <Box
                sx={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    marginTop: '70px'
                }}
            >
                <Typography
                    variant='h1'
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: '600',
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: '90px'
                    }}
                >
                    The Role of Technology in Revolutionizing Dairy Farm Management
                </Typography>
                <Typography
                    variant='h6'
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: '400',
                        color: '#fff',
                        textAlign: 'center',
                        margin: 'auto',
                        width: '50%',
                        fontSize: '16px',
                        marginTop: '60px'
                    }}
                >
Experience the future of dairy farming with the Nevil Nutri Dairy Farm Management System. Whether you're a small-scale family farm or a large commercial operation, our software solution can help you unlock the full potential of your dairy business. Join the digital revolution and take your farm to new heights with Nevil Nutri.

                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '40px'
                    }}
                >
                    <Button
                        sx={{
                            backgroundColor: '#38775B',
                            color: '#fff',
                            border: '1px solid #38775B',
                            marginRight: '48px',
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
                    <Button
                        sx={{
                            color: '#fff',
                            border: '1px solid #fff',
                            fontFamily: 'Poppins',
                            paddingRight: '30px',
                            paddingLeft: '30px',
                            '&:hover': {
                                backgroundColor: '#fff',
                                color: '#38775B'
                                }   
                        }}
                    >
                        Learn More
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default HeroSection;