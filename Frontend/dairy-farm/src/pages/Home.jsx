import React from 'react';
import { Container, Box } from '@mui/material';
import HomeNavigation from '../components/Home/HomeNavigation';
import HeroSection from '../components/Home/HeroSection';

function Home() {
    return (
        <Box>
            <HomeNavigation />
            <HeroSection />
        </Box>
    );
}

export default Home;