import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';

const MilkingDataTable = () => {
  const [milkingData, setMilkingData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedIssues, setSelectedIssues] = useState(null);

  useEffect(() => {
    fetchMilkingData();
  }, []);

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
            <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px' }}>#</TableCell>
            <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px' }}>Milk Batch ID</TableCell>
            <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px' }}>Amount of Milk(Liters)</TableCell>
            <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px' }}>Duration(In Minutes)</TableCell>
            <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px' }}>Quality Check Status</TableCell>
            <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px' }}>Issues</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {milkingData.map((data, index) => (
            <TableRow key={data._id}>
              <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px' }}>{index + 1}</TableCell>
              <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px' }}>{data.milkBatchId}</TableCell>
              <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px' }}>{data.amountOfMilk}</TableCell>
              <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px' }}>{data.duration}</TableCell>
              <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px' }}>{data.qualityCheckResult}</TableCell>
              <TableCell style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: '18px' }}>
                {data.issues ? (
                  <a href="#" onClick={() => handleShowIssues(data.issues)} className='issuesLink'>Click here</a>
                ) : <em>No issues recorded</em>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Popup Dialog for Issues */}
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
