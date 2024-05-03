import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, TextField, Box,Container,Switch,Avatar } from '@mui/material'; // Import TextField for input fields
import PbDelete from '../Inventory/PbDelete';
import PbUpdate from '../Inventory/PbUpdate';
import Grid2 from "@mui/material/Unstable_Grid2";
import eventBus from '../../../ProductionUtils/EventBus';
import axios from 'axios';

function ProductBatchTable() {
  const [productBatches, setProductBatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    fetchData();
    const handleFormSubmitted = () => {
      fetchData(); // Call fetchData when form is submitted
    };
    eventBus.on('formSubmitted', handleFormSubmitted);

    // Unsubscribe from 'formSubmitted' event when component unmounts
    return () => {
      eventBus.off('formSubmitted', handleFormSubmitted);
    };
  }, []);

  useEffect(() => {
    filterRows();
  }, [searchQuery, productBatches]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/productBatchCrud/productBatch');
      setProductBatches(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleted = () => {
    fetchData(); // Refetch data after deletion
  };

  const handleUpdated = () => {
    fetchData(); // Refetch data after update
  };

  const filterRows = () => {
    const filtered = productBatches.filter(
      row =>
        row.productId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRows(filtered);
  };

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleReleaseToggle = async (id, releaseState) => {
    try {
      await axios.put(`http://localhost:3000/api/productBatchCrud/productBatch/${id}`, { released: releaseState });
      fetchData(); // Refetch data after update
    } catch (error) {
      console.error('Error updating release state:', error);
    }
  };

  const rows = filteredRows.map((productBatch, index) => ({
    id: index + 1,
    //ProductId: productBatch.productId,
    Name: productBatch.name,
    Variant: productBatch.variant,
    Quantity: productBatch.quantity,
    ManufactureDate: productBatch.manufactureDate ? new Date(productBatch.manufactureDate).toLocaleDateString() : 'N/A',
    ManufactureTime: productBatch.manufactureTime,
    ExpiryDate: productBatch.expiryDate ? new Date(productBatch.expiryDate).toLocaleDateString() : 'N/A',
    BatchId: productBatch.batchId,
    Status: (
       <Switch
        checked={productBatch.released}
        onChange={(event) => handleReleaseToggle(productBatch._id, event.target.checked)}
        disabled={productBatch.collect} // Disable if collect is true
        sx={{
          '& .MuiSwitch-thumb': {
            backgroundColor: productBatch.collect ? 'Yellow' : '', // Change color to red if collect is true
          },
        }}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    
    ),
    deleteAction: <PbDelete id={productBatch._id} onDeleted={handleDeleted} />,
    updateAction: <PbUpdate id={productBatch._id} onUpdated={handleUpdated} />,
  }));

  const columns = [
    { field: 'id', headerName: 'No', flex: 0 , width:50},
    //{ field: 'ProductId', headerName: 'ID', flex: 1 },
    { field: 'Name', headerName: 'Product', flex: 1 },
    { field: 'Variant', headerName: 'Variant', flex: 1 },
    { field: 'Quantity', headerName: 'Quantity', flex: 1 },
    { field: 'ManufactureDate', headerName: 'Manf. Date', flex: 1 },
    { field: 'ManufactureTime', headerName: 'Manuf. Time', flex: 1 },
    { field: 'ExpiryDate', headerName: 'Expiry Date', flex: 1 },
    { field: 'BatchId', headerName: 'Batch ID', flex: 1 },
    { field: 'Status', headerName: 'Release', flex: 1, renderCell: (params) => params.row.Status },
    { field: 'deleteAction', headerName: 'Delete', renderCell: (params) => params.row.deleteAction, width: 100 },
    { field: 'updateAction', headerName: 'Update', renderCell: (params) => params.row.updateAction, width: 100 },
  ];

  return (
    
    
<Container  style={{ margin: 0, padding: 0,overflow:'hidden' }}>

  <Grid2 container sx={{ width: '100vw', position: 'relative' ,mt:2,}}>

     <Grid2 item xs={10} sm={3} sx={{ml:2 }}>
        <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: 10 }}
      />   
     </Grid2>

     <Grid2 item sm={1} align="left" sx={{ml:40}}>
          <Avatar sx={{ bgcolor: 'yellow' }}>.</Avatar>
          <div>Sold Out</div>
     </Grid2>
     <Grid2 item sm={1} align="left">
          <Avatar sx={{ bgcolor: 'blue' }}>.</Avatar>
          <div>Released</div>
     </Grid2>
     <Grid2 item sm={1} align="left">
          <Avatar sx={{ bgcolor: 'grey' }}>.</Avatar>
          <div>In Storage</div>
     </Grid2>
</Grid2>  

<Grid2 container sx= {{ ml:0,mr:0}}>
  <Grid2 item sm={12} align="center" >
    <Paper sx={{ maxWidth:'100%',borderRadius: 5, height: '100%', maxHeight: '70vh',minHeight:'30vh', overflow: 'auto' }}>  
        <DataGrid
        sx={{minHeight:'30vh', }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[1, 5, 10, 20, 24]}
          disableExtendRowFullWidth
        />
    </Paper>
  </Grid2>
</Grid2>

</Container>

      );
}

export default ProductBatchTable;
