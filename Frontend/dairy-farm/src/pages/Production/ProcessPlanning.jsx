import React from "react";
import ProductionSidebar from "../../components/production/productionSidebar"
import ProcessForm from "../../components/production/ProcessForm"
import Process_ingredientsTable from "../../components/production/Process_ingredientsTable"
import { Container,Box} from "@mui/material"
import ProcessCard from "../../components/production/Process_cards"
import DashboardContent from "../../components/production/DashboardContent";
import Grid2 from "@mui/material/Unstable_Grid2";


function ProcessPlanning() {
    
    
    
    return (
       
<Container maxWidth="none" style={{ margin: 0, padding: 0 }}>

      <Grid2 container >
        <Grid2 item xs={1}><ProductionSidebar/></Grid2>
        <Grid2 item xs={10} sm={5}><ProcessCard/></Grid2>
        <Grid2 item xs={10} sm={6}><Process_ingredientsTable/></Grid2> 
      </Grid2>

      </Container>
    
    );
}

export default ProcessPlanning;