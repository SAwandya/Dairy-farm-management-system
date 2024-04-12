import React from "react";
import GrazingSideBar from "../../components/Grazing/GrazingSideBar";
import Container from "@mui/material/Container";
import { Box, Typography } from '@mui/material';
import WasteTypeBarChart from "../../components/Grazing/WasteTypeBarChart";

function GrazingDashboard() {
    return (
        <Container
            className="main-container"
            sx={{
                display: 'flex',
                flexDirection: 'column', // Display children elements in a column
                alignItems: 'center', // Center the content horizontally
                minHeight: '100vh', // Ensure the container takes full height of the viewport
            }}
        >
            <Box mt={5} textAlign="center"> {/* Add margin top and center align */}
                <Typography variant="h4" className='welcome-text'>Welcome Back!</Typography>
                <Typography variant="h3" className='welcome-name-value'>Ms.Janithya Imalki</Typography>
            </Box>

            <Box mt={3} textAlign="center"> 
                <Typography variant="h4" className='date-text'>Today:</Typography>
                <Typography variant="h4" className='date-value'>20/03/2024</Typography>
            </Box>

            <GrazingSideBar />
            <div></div>
            <div align='center'><WasteTypeBarChart /></div>
        </Container>
    );
}

export default GrazingDashboard;
