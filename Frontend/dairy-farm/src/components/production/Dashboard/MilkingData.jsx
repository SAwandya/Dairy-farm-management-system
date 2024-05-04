import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Paper, Typography, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';

const MilkingDataTable = () => {
  const [milkingData, setMilkingData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredMilkingData, setFilteredMilkingData] = useState([]);

  useEffect(() => {
    fetchMilkingData();
  }, []);

  useEffect(() => {
    filterMilkingData();
  }, [milkingData, selectedDate]);

  const fetchMilkingData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/milkingData');
      if (response.data.success) {
        setMilkingData(response.data.data.map((row, index) => ({ ...row, id: index + 1 })));
      } else {
        console.error('Failed to fetch milking data:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching milking data:', error);
    }
  };

  const filterMilkingData = () => {
    if (!selectedDate) {
      const todayMidnight = new Date();
      todayMidnight.setHours(0, 0, 0, 0);
      const filteredData = milkingData.filter(data => {
        const dataDate = new Date(data.createdAt);
        return (
          dataDate.getFullYear() === todayMidnight.getFullYear() &&
          dataDate.getMonth() === todayMidnight.getMonth() &&
          dataDate.getDate() === todayMidnight.getDate()
        );
      });
      setFilteredMilkingData(filteredData);
    } else {
      const selectedDateMidnight = new Date(selectedDate);
      selectedDateMidnight.setHours(0, 0, 0, 0);
      const filteredData = milkingData.filter(data => {
        const dataDate = new Date(data.createdAt);
        return (
          dataDate.getFullYear() === selectedDateMidnight.getFullYear() &&
          dataDate.getMonth() === selectedDateMidnight.getMonth() &&
          dataDate.getDate() === selectedDateMidnight.getDate()
        );
      });
      setFilteredMilkingData(filteredData);
    }
  };

  return (

    <Paper style={{ borderRadius: '15px',maxHeight:'50vh',minHeight:'50vh' , width: '100%', margin: 'auto' ,overflow:'hidden'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </LocalizationProvider>
      <DataGrid
        rows={filteredMilkingData}
        columns={[
          { field: 'id', headerName: 'ID', flex: 1 },
          { field: 'milkBatchId', headerName: 'Milk Batch', flex: 1 },
          { field: 'amountOfMilk', headerName: 'Amount of Milk(Liters)', flex: 1 },
          { field: 'qualityCheckResult', headerName: 'Quality Check Status', flex: 1 },
        ]}
      />
    </Paper>
  );
};

export default MilkingDataTable;
