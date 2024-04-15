import React from "react";
import DashboardContent from "../../components/production/DashboardContent";
import ProductionSidebar from "../../components/production/productionSidebar";
import { Container,Box,Typography,Button} from "@mui/material"
import Welcome from "../../components/production/Welcome";
import MainStatistics from "../../components/production/MainStatistics";
import ScheduledProcesses from "../../components/production/Dashboard/ScheduledProcesses"
import MilikingData from "../../components/production/Dashboard/MilkingData"
import { Link } from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2";


function ProductionDashboard() {
    return (
<Container maxWidth="100vw" style={{ margin: 0, padding: 0, overflow:'hidden' }}>
     
    <Grid2 container sx={{width: '100vw', position: 'relative', mt:3 }}>
        <Grid2 item xs={1} sm={1}><ProductionSidebar /></Grid2>
        <Grid2 item xs={11} sm={11} sx={{ml:21}}><Welcome/></Grid2>
    </Grid2>
    <Grid2 container sx={{mt:3}}>
        <Grid2 item xs={1} sm={1}></Grid2>
        <Grid2 item xs={11} sm={11} sx={{ml:20}}><MainStatistics/></Grid2>
    </Grid2>  
    <Grid2 container sx={{width: '100vw', position: 'relative',mt:4 }}>
        <Grid2 item xs={1} sm={1}></Grid2>
        <Grid2  xs={3} sx={{ml:5}}><Typography variant="h6" fontWeight="bold" align="left" >Today's Process Schedule</Typography></Grid2> 
        <Grid2  xs={7} sx={{ml:6}}><Typography variant="h6" fontWeight="bold" align="left" >Milk Details</Typography></Grid2> 
    </Grid2>
    <Grid2 container sx={{mt:1 }}>
        <Grid2 item xs={1} sm={1}></Grid2>
        <Grid2  sm={3} sx={{ml:4}}><ScheduledProcesses/></Grid2> 
        <Grid2  sm={7} align="right" sx={{ml:7.5}}><MilikingData/></Grid2> 
    </Grid2>
    <Grid2 container sx={{mt:1 }}>
        <Grid2 item xs={1} sm={1}></Grid2>
        <Grid2  sm={3} sx={{ml:4}} align="right">  
            <Link to="/processPlanning" style={{ textDecoration: 'none' }}>
                <Button variant="contained">
                        More Details
                 </Button>
             </Link>
        </Grid2> 
        <Grid2  sm={7} align="right" sx={{ml:7.5}}>
            <Link to="/dataforproduction" style={{ textDecoration: 'none' }}>
                <Button variant="contained">
                        More Details
                 </Button>
             </Link>
        </Grid2> 
    </Grid2>
        </Container>
    );
}

export default ProductionDashboard;