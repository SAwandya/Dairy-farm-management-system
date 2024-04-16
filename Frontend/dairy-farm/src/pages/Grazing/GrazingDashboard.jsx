import React from "react";
import GrazingSideBar from "../../components/Grazing/GrazingSideBar";
import Container from "@mui/material/Container";
import { Box, Typography } from '@mui/material';
import WasteTypeBarChart from "../../components/Grazing/WasteTypeBarChart";
import GrazingDate from "../../components/Grazing/GrazingDate";
import Name from "../../components/Grazing/Name";
import SessionPieChart from "../../components/Grazing/SessionPieChart";
import NewTable from "../../components/Grazing/NewTable";
import GrazingStat from "../../components/Grazing/GrazingStat";




function GrazingDashboard() {
    return (
        
        
        <Container
            className="main-container"
            margin="16"
            
        >
             <GrazingSideBar/>
             


             
             <Box   width={1} className="dashboard-content" >
                
             <Name/>
                <div>
                    <Box width={1200}>
                        <GrazingDate/>
                    </Box>
                </div>
             
                <Box className="dashboard-below-container">
                

                    <div >
                        <WasteTypeBarChart />
                        <div>
                        <Typography align='center'fontSize={16} >Waste collected is mainly categorized in to four types</Typography>
                        </div>
                        

                    </div>
                    
                <div></div>
                    <div>
                        <SessionPieChart/>
                    </div>

                <div>
                <div> <NewTable/></div>
                <Typography align='center'fontSize={16} >sessions scheduled for today</Typography>
                </div>
                
                </Box>
            </Box>
           
        </Container>
    );
}

export default GrazingDashboard;
