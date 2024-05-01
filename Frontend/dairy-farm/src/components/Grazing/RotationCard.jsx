import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

function SessionTable() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost:3000/api/sessions')
      .then(response => {
        setSessions(response.data);
      })
      .catch(error => {
        console.error('Error fetching sessions:', error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Grazing Area</TableCell>
            <TableCell>Cow Batch</TableCell>
            <TableCell>Walking Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessions.map(session => (
            <TableRow key={session._id}>
              <TableCell>{session.grazingArea || 'N/A'}</TableCell>
              <TableCell>{session.cowBatch || 'N/A'}</TableCell>
              <TableCell>{session.onsiteFeedingDuration || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SessionTable;
