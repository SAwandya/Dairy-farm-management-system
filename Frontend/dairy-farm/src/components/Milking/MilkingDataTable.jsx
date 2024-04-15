import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Pagination } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';

const MilkingDataTable = () => {
  const [milkingData, setMilkingData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedIssues, setSelectedIssues] = useState(null);
  const [filteredMilkingData, setFilteredMilkingData] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 7;

  useEffect(() => {
    fetchMilkingData();
  }, []);

  useEffect(() => {
    filterMilkingData();
  }, [milkingData, selectedDate, page]);

  const fetchMilkingData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/milkingData');
      if (response.data.success) {
        setMilkingData(response.data.data);
      } else {
        console.error('Failed to fetch milking data:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching milking data:', error);
    }
  };

  const filterMilkingData = () => {
    let filteredData = [...milkingData];
    if (!selectedDate) {
      const todayMidnight = new Date();
      todayMidnight.setHours(0, 0, 0, 0);
      filteredData = filteredData.filter(data => {
        const dataDate = new Date(data.createdAt);
        return (
          dataDate.getFullYear() === todayMidnight.getFullYear() &&
          dataDate.getMonth() === todayMidnight.getMonth() &&
          dataDate.getDate() === todayMidnight.getDate()
        );
      });
    } else {
      const selectedDateMidnight = new Date(selectedDate);
      selectedDateMidnight.setHours(0, 0, 0, 0);
      filteredData = filteredData.filter(data => {
        const dataDate = new Date(data.createdAt);
        return (
          dataDate.getFullYear() === selectedDateMidnight.getFullYear() &&
          dataDate.getMonth() === selectedDateMidnight.getMonth() &&
          dataDate.getDate() === selectedDateMidnight.getDate()
        );
      });
    }
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setFilteredMilkingData(filteredData.slice(startIndex, endIndex));
  };
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleShowIssues = (issues) => {
    setSelectedIssues(issues);
  };

  const handleCloseIssues = () => {
    setSelectedIssues(null);
  };

  return (
    <TableContainer component={Paper} style={{ borderRadius: '15px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', width: '80vw' }}>
        <div>
          <h2
            style={{
              fontFamily: 'Poppins',
            }}
          >Milking Data</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </LocalizationProvider>
        </div>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px' }}>Milk Batch</TableCell>
            <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px' }}>Collected Date</TableCell>
            <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px' }}>Amount of Milk(Liters)</TableCell>
            <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px' }}>Duration(In Minutes)</TableCell>
            <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px' }}>Quality Check Status</TableCell>
            <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px' }}>Issues</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredMilkingData.map((data) => (
            <TableRow key={data._id}>
              <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px', backgroundColor: 'rgba(0,0,0,0.03)' }}>{data.milkBatchId}</TableCell>
              <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px', backgroundColor: 'rgba(0,0,0,0.03)' }}>{new Date(data.createdAt).toISOString().split('T')[0]}</TableCell>
              <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px', backgroundColor: 'rgba(0,0,0,0.03)' }}>{data.amountOfMilk}</TableCell>
              <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px', backgroundColor: 'rgba(0,0,0,0.03)' }}>{data.duration}</TableCell>
              <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px', backgroundColor: 'rgba(0,0,0,0.03)' }}>{data.qualityCheckResult}</TableCell>
              <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px', backgroundColor: 'rgba(0,0,0,0.03)' }}>
                {data.issues ? (
                  <a href="#" onClick={() => handleShowIssues(data.issues)} className='specialNotesLink'>Click here</a>
                ) : <em>No issues recorded</em>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={Math.ceil(milkingData.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
        size="large"
        color="primary"
        style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}
      />
      <Dialog open={selectedIssues !== null} onClose={handleCloseIssues}>
        <DialogTitle>Issues Details</DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedIssues}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseIssues}>Close</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default MilkingDataTable;