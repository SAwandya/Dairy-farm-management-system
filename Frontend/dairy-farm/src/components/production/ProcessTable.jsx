import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper } from '@mui/material';
import ProcessUpdateButton from '../../components/production/ProcessUpdateButton';
import ProcessDeleteButton from '../../components/production/ProcessDeleteButton';
import NewProcessForm from '../../pages/Production/Testdialog';
import axios from 'axios';

function ProcessTable() {
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/processCrud/processes');
      setProcesses(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleDeleted = () => {
    fetchData(); // Refetch data after deletion
  };
  const handleUpdated = () => {
    fetchData(); // Refetch data after deletion
  };

  const rows = processes.map((process, index) => ({
    id: index + 1,
    product: process.product,
    milkQuantity: process.milkQuantity,
    ingredients: process.ingredients.join(', '), 
    specialNotes: process.specialNotes,
    scheduleDate: process.scheduleDate ? new Date(process.scheduleDate).toLocaleDateString() : 'N/A',
    scheduleTime: process.scheduleTime,
    status: process.status,
    deleteAction: <ProcessDeleteButton id={process._id} onDeleted={handleDeleted} />,
    updateAction: <ProcessUpdateButton id={process._id} onUpdated={handleUpdated} />,
  }));

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'product', headerName: 'Product' },
    { field: 'milkQuantity', headerName: 'Milk Quantity' },
    { field: 'ingredients', headerName: 'Ingredients' },
    { field: 'specialNotes', headerName: 'Special Notes' },
    { field: 'scheduleDate', headerName: 'Schedule Date' },
    { field: 'scheduleTime', headerName: 'Schedule Time' },
    { field: 'status', headerName: 'Status' },
    { field: 'deleteAction', headerName: 'Delete', renderCell: (params) => params.row.deleteAction, width: 100 },
    { field: 'updateAction', headerName: 'Update', renderCell: (params) => params.row.updateAction, width: 100 },
  ];

  return (
    
    

    <Paper sx={{ borderRadius: 5, height: '100%', maxHeight: '50vh', overflow: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[1, 5, 10, 20, 24]}
      
     
      />
    </Paper>
    
  );
}

export default ProcessTable;
