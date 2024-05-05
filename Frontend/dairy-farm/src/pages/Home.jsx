import React from 'react';
import { Container, Box } from '@mui/material';
import HomeNavigation from '../components/Home/HomeNavigation';
import HeroSection from '../components/Home/HeroSection';
import HomeContent from '../components/Home/HomeContent';
import Footer from '../components/Home/Footer';

function Home() {
    return (
        <Box>
            <HomeNavigation />
            <HeroSection />
            <HomeContent />
            <Footer />
        </Box>
    );
}

export default Home;