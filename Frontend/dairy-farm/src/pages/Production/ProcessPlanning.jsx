import React from "react";

import ProductionSidebar from "../../components/production/productionSidebar"
import Process_ingredientsTable from "../../components/production/Process_ingredientsTable"
import ProcessCard from "../../components/production/Process_cards"
import Process_resTable from "../../components/production/Process_resTable"
import Testdialog from "../../pages/Production/Testdialog"
import ProcessTable from "../../components/production/ProcessTable";


import { Container,Box,Typography,Button} from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2";


function ProcessPlanning() {
    
    
    
    return (
       
<Container maxWidth="100vw" style={{ margin: 0, padding: 0,overflow:'hidden' }}>
  {/*, height: '100vh', overflow: 'hidden' */}

      <Grid2 container sx={{mt:5,}} >
      <Grid2 item xs={1} sm={1}></Grid2>
        <Grid2 item xs={10} sm={3} sx={{ml:3}}><Typography variant="h4" align="center">Ingredients</Typography></Grid2>
        <Grid2 item xs={10} sm={3} sx={{ml:3}}><Typography variant="h4" align="center">Ongoing Processes</Typography></Grid2> 
        <Grid2 item xs={10} sm={4} sx={{ml:3}}><Typography variant="h4" align="center">Equipements</Typography></Grid2> 
      </Grid2>


      <Grid2 container sx={{ width: '100vw', position: 'relative' }}>
        <Grid2 item xs={1} sm={1}><ProductionSidebar/></Grid2>
        <Grid2 item xs={10} sm={3} sx={{ml:3}}><Process_ingredientsTable/></Grid2>
        <Grid2 item xs={10} sm={3} sx={{ml:3}}><ProcessCard/></Grid2> 
        <Grid2 item xs={10} sm={4} sx={{ml:3}}><Process_resTable/></Grid2> 
      </Grid2>

      <Grid2 container sx={{ width: '100vw', position: 'relative' ,mt:4 }}>
        <Grid2 item xs={1} sm={1}></Grid2>
        <Grid2 item xs={10} sm={3} sx={{ml:3}}></Grid2>
        <Grid2 item xs={10} sm={3} sx={{ml:3}} align="center"><Testdialog/></Grid2> 
        <Grid2 item xs={10} sm={4} sx={{ml:3}}></Grid2> 
      </Grid2>
      <Grid2 container sx={{ width: '100vw', position: 'relative' ,mt:6 }}>
        <Grid2 item xs={1} sm={1}></Grid2>
        <Grid2 item xs={10} sm={3} sx={{ml:3}}></Grid2>
        <Grid2 item xs={10} sm={3} sx={{ml:3}} align="center"><Typography variant="h4" align="center">All Processes</Typography></Grid2> 
        <Grid2 item xs={10} sm={4} sx={{ml:3}}></Grid2> 
      </Grid2>
     

{/*
      <Grid2 container sx={{mt:5,ml:2,mr:2}}>
        <Grid2 item xs={1}></Grid2> 
        <Grid2 item sm={11} ><Typography variant="h4" align="center">All Processes</Typography></Grid2>
      </Grid2>

*/}

      <Grid2 container sx={{mt:2,ml:2,mr:2}} >
        <Grid2 item xs={1}></Grid2> 
        <Grid2 item sm={11} align="center" ><ProcessTable/></Grid2>
      </Grid2>
    
      </Container>
    
    );
}

export default ProcessPlanning;