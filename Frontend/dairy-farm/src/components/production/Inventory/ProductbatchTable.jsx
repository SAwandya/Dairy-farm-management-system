import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, TextField, Box,Container } from '@mui/material'; // Import TextField for input fields
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

  const rows = filteredRows.map((productBatch, index) => ({
    id: index + 1,
    ProductId: productBatch.productId,
    Name: productBatch.name,
    Variant: productBatch.variant,
    Quantity: productBatch.quantity,
    ManufactureDate: productBatch.manufactureDate ? new Date(productBatch.manufactureDate).toLocaleDateString() : 'N/A',
    ManufactureTime: productBatch.manufactureTime,
    //ExpiryDate: productBatch.expiryDate ? new Date(productBatch.expiryDate).toLocaleDateString() : 'N/A',
    BatchId: productBatch.batchId,
    Status: productBatch.released,
    deleteAction: <PbDelete id={productBatch._id} onDeleted={handleDeleted} />,
    updateAction: <PbUpdate id={productBatch._id} onUpdated={handleUpdated} />,
  }));

  const columns = [
    { field: 'id', headerName: 'No', flex: 1},
    { field: 'ProductId', headerName: 'ID', flex: 1 },
    { field: 'Name', headerName: 'Product', flex: 1 },
    { field: 'Variant', headerName: 'Variant', flex: 1 },
    { field: 'Quantity', headerName: 'Quantity', flex: 1 },
    { field: 'ManufactureDate', headerName: 'Manufacture Date', flex: 1 },
    { field: 'ManufactureTime', headerName: 'Manufacture Time', flex: 1 },
    //{ field: 'ExpiryDate', headerName: 'Expiry Date', flex: 1 },
    { field: 'BatchId', headerName: 'Batch ID', flex: 1 },
    { field: 'Status', headerName: 'Status', flex: 1 },
    { field: 'deleteAction', headerName: 'Delete', renderCell: (params) => params.row.deleteAction, width: 100 },
    { field: 'updateAction', headerName: 'Update', renderCell: (params) => params.row.updateAction, width: 100 },
  ];

  return (
    
    
      <Container>

  <Grid2 container sx={{ width: '100vw', position: 'relative' ,mt:-2,}}>
        <Grid2 item xs={10} sm={10} sx={{ml:-2.6, }}>
        <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: 10 }}
     />   

    <Paper sx={{ borderRadius: 5, height: '100%', maxHeight: '70vh',minHeight:'30vh', overflow: 'auto' }}>  
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
