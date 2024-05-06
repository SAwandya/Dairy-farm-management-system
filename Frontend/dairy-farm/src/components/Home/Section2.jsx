import React from 'react';
import { Typography, Box } from '@mui/material';
import ServiceCard from './ServiceCard';
import BlogSVG from './Icons/blog.svg';
import ContentSVG from './Icons/content.svg';
import ChartSVG from './Icons/chart.svg';
import SocialSVG from './Icons/social.svg';

function Section2() {
    return (
        <Box>
            <Typography
                variant='h2'
                sx={{
                    fontFamily: 'Poppins',
                    fontWeight: '600',
                    color: '#38775B',
                    textAlign: 'center',
                    fontSize: '70px',
                    marginTop: '108px'
                }}
            >
                Our Service
            </Typography>
            <Typography
                variant='h6'
                sx={{
                    fontFamily: 'Poppins',
                    fontWeight: '400',
                    color: '#000',
                    textAlign: 'center',
                    width: '50%',
                    margin: 'auto',
                    fontSize: '14px',
                    marginTop: '20px'
                }}
            >
Our Dairy Farm Management System is a comprehensive software platform that empowers dairy farmers to efficiently manage every aspect of their operation, from herd health and milk production to inventory management and financial tracking. Developed by our expert IT team with years of industry experience, our system is intuitive, user-friendly, and tailored to meet the unique needs of dairy farmers in Sri Lanka and beyond.

            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '64px'
                }}
            >
                <ServiceCard icon={BlogSVG} text="Blog and Article Writing" />
                <ServiceCard icon={ContentSVG} text="Website Content" />
                <ServiceCard icon={ChartSVG} text="Content Strategy and Consulting" />
                <ServiceCard icon={SocialSVG} text="Social Media Management" />
            </Box>
        </Box>
    );
}

export default Section2;