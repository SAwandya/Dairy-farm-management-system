import React from 'react';
import { Container, Box } from '@mui/material';
import HomeNavigation from '../components/Home/HomeNavigation';
import HeroSection from '../components/Home/HeroSection';
import HomeContent from '../components/Home/HomeContent';

function Home() {
    return (
        <Box>
            <HomeNavigation />
            <HeroSection />
            <HomeContent />
        </Box>
    );
}

export default Home;