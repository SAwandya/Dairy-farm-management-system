import React from "react";
import GrazingSideBar from "../../components/Grazing/GrazingSideBar";
import Container from "@mui/material/Container";
import { Box, Typography,Card } from '@mui/material';
import WasteTypeBarChart from "../../components/Grazing/WasteTypeBarChart";
import GrazingDate from "../../components/Grazing/GrazingDate";
import Name from "../../components/Grazing/Name";
import SessionPieChart from "../../components/Grazing/SessionPieChart";
import NewTable from "../../components/Grazing/NewTable";




function GrazingDashboard() {
    return (
        
        
        <Container
            className="main-container"
            margin="16"
        >
            <GrazingSideBar/>       
            <Box width={1} className="dashboard-content" >
                <Box className="welcome-header">
                    <Name/>
                    <GrazingDate/>
                </Box>
             
                <Box className="dashboard-below-container">
                    <Box className="chart-card-container" sx={{marginRight: '36px'}}>
                        <Typography
                            variant="h3"
                            className='graph-card-title'
                            sx={{
                                fontSize: '18px',
                                fontWeight: '600',
                            }}
                        >
                            Waste collected in the Farm
                        </Typography>
                        <Typography
                            variant="h3"
                            className='graph-card-subtitle'
                            sx={{
                                fontSize: '16px',
                                fontWeight: '400',
                                marginTop: '8px'
                            }}
                        >
                            Past Month
                        </Typography>
                        <WasteTypeBarChart />
                    </Box>
                    <Box className="chart-card-container">
                        <Typography
                            variant="h3"
                            className='graph-card-title'
                            sx={{
                                fontSize: '18px',
                                fontWeight: '600',
                            }}
                        >Today's sessions</Typography>
                        <SessionPieChart/>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default GrazingDashboard;
