import React from 'react';
import { Container, Box } from '@mui/material';

function HomeNavigation() {
    return (
        <Box
            sx={{
                height: '100px',
                backgroundColor: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                paddingRight: '100px',
                paddingLeft: '100px',
            }}
        >
            <img src='../../../../src/assets/sidebar-logo.png' alt="logo" width="180px"></img>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <a className="home-nav-link" href="/home">Home</a>
                <a className="home-nav-link" href="/">Shop</a>
                <a className="home-nav-link" href="/homeM">Admin Section</a>
            </Box>
            
        </Box>
    );
}

export default HomeNavigation;