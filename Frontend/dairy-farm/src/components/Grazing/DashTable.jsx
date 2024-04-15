import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

function NewTable() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Get current date in DD-MM-YYYY format
    const currentDate = new Date().toLocaleDateString('en-GB');

    // Fetch sessions from the backend API for the current date
    axios.get(`http://localhost:3000/api/sessions/date/${currentDate}`)
      .then(response => {
        setSessions(response.data);
      })
      .catch(error => {
        console.error('Error fetching sessions:', error);
      });
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Grazing Area</TableCell>
              <TableCell>Cow Batch</TableCell>
              <TableCell>Grazing Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map(session => (
              <TableRow key={session._id}>
                <TableCell>{session.grazingArea || 'N/A'}</TableCell>
                <TableCell>{session.cowBatch || 'N/A'}</TableCell>
                <TableCell>{session.grazingDuration || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DashTable;
