import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper } from '@mui/material';
import ProcessUpdateButton from '../../components/production/ProcessUpdateButton';
import ProcessDeleteButton from '../../components/production/ProcessDeleteButton';
import eventBus from "../../ProductionUtils/EventBus";
import axios from 'axios';

function ProcessTable() {
  const [processes, setProcesses] = useState([]);

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
   // specialNotes: process.specialNotes,
    scheduleDate: process.scheduleDate ? new Date(process.scheduleDate).toLocaleDateString() : 'N/A',
    scheduleTime: process.scheduleTime,
    status: process.status,
    deleteAction: <ProcessDeleteButton id={process._id} onDeleted={handleDeleted} />,
    updateAction: <ProcessUpdateButton id={process._id} onUpdated={handleUpdated} />,
  }));

  const columns = [
    { field: 'id', headerName: 'ID',maxWidth:60  },
    { field: 'product', headerName: 'Product' ,minWidth: 170},
    { field: 'milkQuantity', headerName: 'Milk Quantity',minWidth: 120 },
    { field: 'ingredients', headerName: 'Ingredients',minWidth: 170 },
   // { field: 'specialNotes', headerName: 'Special Notes',minWidth: 130 },
    { field: 'scheduleDate', headerName: 'Schedule Date',minWidth: 140 },
    { field: 'scheduleTime', headerName: 'Schedule Time' ,minWidth: 130},
    { field: 'status', headerName: 'Status' ,minWidth: 160},
    { field: 'deleteAction', headerName: 'Delete', renderCell: (params) => params.row.deleteAction, width: 100 },
    { field: 'updateAction', headerName: 'Update', renderCell: (params) => params.row.updateAction, width: 100 },
  ];

  return (
    
    

    <Paper sx={{ borderRadius: 5, height: '100%', maxHeight: '70vh', overflow: 'auto' }}>
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
