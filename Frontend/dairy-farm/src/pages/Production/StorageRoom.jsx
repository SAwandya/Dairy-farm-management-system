import React from "react";

import ProductionSidebar from "../../components/production/productionSidebar"

import TemperatureCard from "../../components/production/Storage/TemperatureCard"



import { Container,Box,Typography,Button} from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2";


function StorageRoom() {
    
    
    
    return (
       
<Container maxWidth="100vw" style={{ margin: 0, padding: 0,overflow:'hidden' }}>
  {/*, height: '100vh', overflow: 'hidden'  */}

     


      <Grid2 container sx={{ width: '100vw', position: 'relative' }}>
        <Grid2 item xs={1} sm={1}><ProductionSidebar/></Grid2>
       <Grid2 item xs={10} sm={3}><TemperatureCard/></Grid2> 
        <Grid2 item xs={10} sm={3}></Grid2> 
        <Grid2 item xs={10} sm={5}></Grid2> 
      </Grid2>


      

      </Container>
    
    );
}

export default StorageRoom;

