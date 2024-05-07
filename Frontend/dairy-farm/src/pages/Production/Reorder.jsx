import React from "react";import ProductionSidebar from "../../components/production/productionSidebar";
import { Container,Box,Typography,Button} from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2";
import ReorderMessage from "../../components/Sales/ReorderMessage";


function Reorder() {
    return (
<Container maxWidth="100vw" style={{ margin: 0, padding: 0, overflow:'hidden' }}>
     
    <Grid2 container sx={{width: '100vw', position: 'relative', mt:3 }}>
        <Grid2 item xs={1} sm={1}><ProductionSidebar /></Grid2>
        <Grid2 item xs={11} sm={11} sx={{ml:21}}><ReorderMessage/></Grid2>
    </Grid2>
   
        </Container>
    );
}

export default Reorder;