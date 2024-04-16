import React from "react";
import ProductionSidebar from "../../components/production/productionSidebar"
import ProductBatchTable from "../../components/production/Inventory/ProductbatchTable"
import ProductBatchForm from "../../components/production/Inventory/ProductBatchForm"
import InventoryReport from "../../components/production/Inventory/InventoryReport"
import { Container,Box,Typography,Button} from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2";


function ProductInventory() {
return (
       
<Container maxWidth="100vw" style={{ margin: 0, padding: 0,overflow:'hidden' }}>
  {/*, height: '100vh', overflow: 'hidden' */}



      <Grid2 container sx={{ width: '100vw', position: 'relative' }}>
        <Grid2 item xs={1}sm={1}><ProductionSidebar/></Grid2>
        <Grid2 item xs={10} sx={{ml:3,mr:3,mt:3,}} ><Typography variant="h4" align="center" fontWeight="bold">Product Batches</Typography></Grid2>
      </Grid2>
      <Grid2 container sx={{ width: '100vw', position: 'relative' }}>
        <Grid2 item xs={1}sm={1}></Grid2>
        <Grid2 item xs={10} sx={{ml:3,mr:3,mt:3}}><ProductBatchTable/></Grid2>
      </Grid2>

      

      <Grid2 container sx={{mt:4,ml:50}} >
      <Grid2 item sm={7} align="right"></Grid2>
        <Grid2 item sm={2} align="right"><ProductBatchForm/></Grid2>
        <Grid2 item sm={2} align="left" sx={{ml:4}}><InventoryReport/></Grid2>
      </Grid2>

      </Container>
    
    );
}

export default ProductInventory;