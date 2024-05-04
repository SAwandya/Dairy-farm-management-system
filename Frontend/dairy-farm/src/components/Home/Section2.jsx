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
                Our service
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
                Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular.
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