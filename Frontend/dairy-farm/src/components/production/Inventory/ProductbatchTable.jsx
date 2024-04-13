import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, TextField } from '@mui/material'; // Import TextField for input fields
import PbDelete from '../Inventory/PbDelete';
import PbUpdate from '../Inventory/PbUpdate';
import axios from 'axios';

function ProductBatchTable() {
  const [productBatches, setProductBatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    fetchData();
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
    <Paper sx={{ borderRadius: 5, height: '100%', maxHeight: '70vh', overflow: 'auto' }}>  
      {/* Input field for searching */}
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: 10 }}
      />    
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[1, 5, 10, 20, 24]}
        disableExtendRowFullWidth
         // Prevent the table header from scrolling
        sx={{
          '& .MuiDataGrid-root': {
            backgroundColor: '#fff',
          },
          '& .MuiDataGrid-cell': {
            color: '#333',
            fontSize: '0.875rem',
          },
          '& .MuiDataGrid-row': {
            borderBottom: '1px solid #e0e0e0',
          },
          '& .MuiDataGrid-header': {
            backgroundColor: '#f5f5f5',
          },
          '& .MuiDataGrid-colCellTitle': {
            fontWeight: 'bold',
          },
        }}
      />
    </Paper>
  );
}

export default ProductBatchTable;
