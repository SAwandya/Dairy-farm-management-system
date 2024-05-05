import React from "react";
import ProductionSidebar from "../../components/production/productionSidebar"
import { Container, Box, Typography, Button, Paper } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2";
import SensorDisplay from "../../components/production/Hydroponic/SensorDisplay";
import backgroundImage from "../../assets/hydro2.webp";

function ProductInventory() {
  return (
   
      <Container maxWidth="100vw" style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
         <Paper
      sx={{
        width: '75vw', // Set width to 75% of the viewport width
        height: '75vh', // Set height to 75% of the viewport height
        backgroundImage: `url(${backgroundImage})`, // Set background image
        backgroundSize: 'cover', // Cover the entire area
        backgroundPosition: 'center', // Center the background image
        position: 'absolute', // Position the paper absolutely
        top: '50%', // Center vertically
        left: '54.2%', // Center horizontally
        transform: 'translate(-50%, -50%)', // Center the paper
        opacity: 0.9, // Set opacity to 75%
        zIndex: -1, // Set a lower z-index to ensure it's behind other content
      }}
    >
</Paper>
        <Grid2 container sx={{ width: '100vw', position: 'relative' }}>
          <Grid2 item xs={1} sm={1}><ProductionSidebar /></Grid2>
          <Grid2 item xs={10} sx={{ ml: 3, mr: 3, mt: 6, }}>
            <Typography variant="h4" align="center" fontWeight="bold" color="black">Smart Hydroponic System</Typography></Grid2>
         <Grid2 item xs={1} sm={1}></Grid2>
          <Grid2 item xs={10} sx={{ ml: 3, mr: 3, mt: 15, }}>
          <SensorDisplay></SensorDisplay>
        </Grid2>
        </Grid2>
        
      </Container>
  );
}

export default ProductInventory;
