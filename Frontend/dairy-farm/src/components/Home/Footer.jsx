import React from 'react';
import { Container, Box, Typography } from '@mui/material';

function Footer() {
    return (
        <Box
            sx={{
                width: '100%',
                height: '480px',
                backgroundColor: '#38775B',
                marginTop: '108px',
                display: 'flex',
                
            }}
        >
            <Box
                sx={{
                    marginLeft: '120px'
                }}
            >
                <Typography
                    variant='h2'
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: '600',
                        color: '#fff',
                        textAlign: 'left',
                        fontSize: '50px',
                        marginTop: '80px',
                        paddingTop: '30px'
                    }}
                >
                    Nevil Nutri Farms
                </Typography>
                <Typography
                    variant='h6'
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: '400',
                        color: '#fff',
                        textAlign: 'left',
                        margin: 'auto',
                        fontSize: '14px',
                        marginTop: '20px'
                    }}
                >
                    Li Europan lingues es membres del sam familie. Lor separat existentie
                </Typography>
                <img src="../../../../src/assets/social-media.png" alt="social media logos" className='social-media-icons'/>
            </Box>
            <Box
                sx={{
                    marginLeft: '280px'
                }}
            >
                <Typography
                    variant='h2'
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: '600',
                        color: '#fff',
                        textAlign: 'left',
                        fontSize: '26px',
                        marginTop: '80px',
                        paddingTop: '30px'
                    }}
                >
                    Subsystems
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <a className="footer-links" href="/dashboard">Grazing Management Subsystem</a>
                    <a className="footer-links" href="/milkingDashboard">Milking Management Subsystem</a>
                    <a className="footer-links" href="/ProductionDashboard">Production Management Subsystem</a>
                    <a className="footer-links" href="/vetdashboard">Veterinary Management Subsystem</a>
                    <a className="footer-links" href="/SalesDashboard">Sales Management Subsystem</a>
                    <a className="footer-links" href="/employeedashboard">Employee Management Subsystem</a>
                    <a className="footer-links" href="/financedashboard">Finance Management Subsystem</a>
                    <a className="footer-links" href="/supplierdashboard">Supplier Management Subsystem</a>
                </Box>
            </Box>
            
        </Box>
    );
}

export default Footer;