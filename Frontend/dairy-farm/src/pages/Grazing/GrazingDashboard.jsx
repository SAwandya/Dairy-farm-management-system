import React from "react";
import GrazingSideBar from "../../components/Grazing/GrazingSideBar";
import Container from "@mui/material/Container";
import { Box, Typography } from '@mui/material';
import WasteTypeBarChart from "../../components/Grazing/WasteTypeBarChart";
import GrazingDate from "../../components/Grazing/GrazingDate";
import Name from "../../components/Grazing/Name";
import SessionPieChart from "../../components/Grazing/SessionPieChart";



function GrazingDashboard() {
    return (
        
        
        <Container
            className="main-container"
            sx={{
                display: 'flex',
                flexDirection: 'column', 
                 width:'100%'
                
            }}
        >
             <GrazingSideBar/>
             <Box  width={1}className="dashboard-content">
                
                <GrazingDate/>
                <Name/>
                <Typography>Here is an overview of the  Overall Grazing Function </Typography>
                <Box className="dashboard-below-container">
            
                <div >
                    <WasteTypeBarChart />
                    <div>
                    <Typography align='center'fontSize={16} >Waste collected is mainly categorized in to four types</Typography>
                    </div>
                    

                </div> 
                <div>
                    <SessionPieChart/>
                </div>
                
                </Box>
            </Box>
            
          
            
            </Container>
    );
}

export default GrazingDashboard;
