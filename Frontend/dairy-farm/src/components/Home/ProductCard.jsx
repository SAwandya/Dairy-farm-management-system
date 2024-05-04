import React from 'react';
import { Container, Box, Typography } from '@mui/material';

function ProductCard({ imgSrc, title, text }) {
    return (
        <Box
            sx={{
                width: '270px',
                height: '480px',
                backgroundColor: '#fff',
                borderRadius: '20px',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1)'
            }}
        >
            <img src={imgSrc} alt={title} className='product-card-img'/>
            <Typography
                variant="h5"
                sx={{
                    fontFamily: 'Poppins',
                    textAlign: 'center',
                    color: '#38775B',
                    fontWeight: '500',
                }}
            >
                {title}
            </Typography>
            <Typography
                sx={{
                    fontFamily: 'Poppins',
                    textAlign: 'center',
                    color: '#000',
                    margin: '0 20px',
                    marginTop: '20px'
                }}
            >
                {text}
            </Typography>
        </Box>
    );
}

export default ProductCard;