import React from "react";
import ProductionSidebar from "../../components/production/productionSidebar"
import { Container, Box, Typography, Button, Paper } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2";
import SensorDisplay from "../../components/production/Hydroponic/SensorDisplay";
import backgroundImage from "../../assets/hydro2.webp";

function ProductInventory() {
  return (
      <Container maxWidth="100vw" style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        {/*, height: '100vh', overflow: 'hidden' */}
        <Grid2 container sx={{ width: '100vw', position: 'relative' }}>
          <Grid2 item xs={1} sm={1}><ProductionSidebar /></Grid2>
          <Grid2 item xs={10} sx={{ ml: 3, mr: 3, mt: 6, }}><Typography variant="h4" align="center" fontWeight="bold" color="white">Smart Hydroponic System</Typography></Grid2>
        </Grid2>

        <Grid2 container sx={{ width: '100vw', position: 'relative', mt: 10 }}>
          <Grid2 item xs={1} sm={1}></Grid2>
          <Grid2 item xs={10} sx={{ ml: 3, mr: 3, mt: 3, }}>
            <SensorDisplay></SensorDisplay>
          </Grid2>
        </Grid2>

      </Container>
  
  );
}

export default ProductInventory;
