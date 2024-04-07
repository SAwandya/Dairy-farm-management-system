import React from "react";

import ProductionSidebar from "../../components/production/productionSidebar"

import TemperatureCard1 from "../../components/production/Storage/TemperatureCard1"
import TemperatureCard2 from "../../components/production/Storage/TemperatureCard2"
import TemperatureCard3 from "../../components/production/Storage/TemperatureCard3"
import TemperatureCard4 from "../../components/production/Storage/TemperatureCard4"
import TemperatureCard5 from "../../components/production/Storage/TemperatureCard5"
import TemperatureCard6 from "../../components/production/Storage/TemperatureCard6"





import { Container,Box,Typography,Button} from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2";


function StorageRoom() {
    
    
    
    return (
       
<Container maxWidth="100vw" style={{ margin: 0, padding: 0,overflow:'hidden' }}>
  {/*, height: '100vh', overflow: 'hidden'  */}

     
  <Grid2 container sx={{ width: '100vw', position: 'relative' ,mt:5}}>
        <Grid2 item xs={1} sm={1}><ProductionSidebar/></Grid2>
        
        <Grid2 item xs={11} sm={11} md={11} align="center"><Typography variant="h4" align="center">Storage room</Typography></Grid2> 
        

      </Grid2>

      <Grid2 container sx={{ width: '100vw', position: 'relative' ,mt:2}}>
        <Grid2 item xs={1} sm={1}></Grid2>
        <Grid2 item xs={1} sm={1}></Grid2>
       <Grid2 item xs={10} sm={10} md={3} ><TemperatureCard1/></Grid2> 
        <Grid2 item xs={10} sm={10} md={3}><TemperatureCard2/></Grid2> 
        <Grid2 item xs={10} sm={10} md={3}><TemperatureCard3/></Grid2> 
        <Grid2 item xs={1} sm={1}></Grid2>

      </Grid2>
      <Grid2 container sx={{ width: '100vw', position: 'relative' ,mt:2}}>
        <Grid2 item xs={1} sm={1}></Grid2>
        <Grid2 item xs={1} sm={1}></Grid2>
       <Grid2 item xs={10} sm={10} md={3} ><TemperatureCard4/></Grid2> 
        <Grid2 item xs={10} sm={10} md={3}><TemperatureCard5/></Grid2> 
        <Grid2 item xs={10} sm={10} md={3}><TemperatureCard6/></Grid2> 
        <Grid2 item xs={1} sm={1}></Grid2>

      </Grid2>


      

      </Container>
    
    );
}

export default StorageRoom;

