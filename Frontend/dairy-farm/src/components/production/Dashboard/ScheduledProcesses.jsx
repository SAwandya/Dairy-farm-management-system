import React, { useState, useEffect } from 'react';
import { Paper, styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { minWidth } from '@mui/system';


function ScheduledProcesses() {
  const [scheduledProcesses, setScheduledProcesses] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/processCrud/processes');
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

      const filteredProcesses = response.data.filter(process => {
        if (process.status === 'scheduled') {
          const schDate = new Date(process.scheduleDate).toISOString().split('T')[0];
          
          if (schDate === currentDate) {
            return true; // Show processes scheduled for today
          } else {
            return false; // Hide other processes
          }
        } else {
          return false; // Hide other processes
        }
      });

      setScheduledProcesses(filteredProcesses);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Define the columns for the DataGrid 
  const columns = [
    { field: 'id', headerName: 'ID',width:75 },
    { field: 'product', headerName: 'Product',width:180},
    { field: 'Time', headerName: 'Time',width:75   },
  ];

  // Convert scheduledProcesses into rows for the DataGrid
  const rows = scheduledProcesses.map((process, index) => ({
    id: index + 1,
    product: process.product,
    Time: process.scheduleTime,
  }));

  return (

    <Paper sx={{ borderRadius: 5, height: '100%', maxHeight: '50vh',minHeight:'30vh', overflow: 'auto', }}>  
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
      />
    </Paper>
  );
}

export default ScheduledProcesses;
