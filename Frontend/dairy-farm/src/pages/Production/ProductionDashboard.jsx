import React from "react";
import DashboardContent from "../../components/production/DashboardContent";
import ProductionSidebar from "../../components/production/productionSidebar";
import { Container,Box,Typography,Button} from "@mui/material"
import Welcome from "../../components/production/Welcome";
import MainStatistics from "../../components/production/MainStatistics";

import Grid2 from "@mui/material/Unstable_Grid2";


function ProductionDashboard() {
    return (
        <Container maxWidth="100vw" style={{ margin: 0, padding: 0,overflow:'hidden' }}>           
     
        <Grid2 container sx={{ width: '100vw', position: 'relative',mt:2 }}>
        <Grid2 item xs={1} sm={1}><ProductionSidebar /></Grid2>
        <Grid2 item xs={10} sm={11} sx={{ml:20}}><Welcome/></Grid2>
        </Grid2>
      <Grid2 container sx={{ width: '100vw', position: 'relative' ,mt:5}}>
        <Grid2 item xs={1} sm={1}></Grid2>
        <Grid2 item xs={10} sm={11} sx={{ml:20}}><MainStatistics/></Grid2>
      </Grid2>
      


      

            
        </Container>
    );
}

export default ProductionDashboard;