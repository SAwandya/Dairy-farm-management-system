import React from 'react';
import { Typography, Box } from '@mui/material';
import ProductCard from './ProductCard';

function Section3() {
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
                Our Featured Product
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
From creamy milk to velvety yogurt and artisanal cheeses, Nevil Nutri offers a diverse range of dairy delights to suit every taste and preference. Our products are lovingly crafted using fresh, locally-sourced milk from our own herd of happy cows, ensuring unparalleled freshness and flavor in every bite.

            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '64px',
                    marginBottom: '36px'
                }}
            >
                <ProductCard 
                    imgSrc="../../../../src/assets/curd-pic.png"
                    title="Curd" 
                    text="Indulge in the creamy perfection of Nevil Nutri's curd, made from the finest milk for a delightful tangy taste." 
                />
                <ProductCard 
                    imgSrc="../../../../src/assets/cheese-pic.png" 
                    title="Cheese" 
                    text="Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. " 
                />
                <ProductCard 
                    imgSrc="../../../../src/assets/icecream-pic.png" 
                    title="Ice Cream" 
                    text="Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. " 
                />
                <ProductCard 
                    imgSrc="../../../../src/assets/yogurt-pic.png" 
                    title="Yogurt" 
                    text="Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. " 
                />
            </Box>
            <a href='/' className='sales-product-link'>See all products</a>
        </Box>
    );
}

export default Section3;