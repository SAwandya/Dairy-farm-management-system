import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

function NewTable() {
  const [sessions, setSessions] = useState([]);
 

  useEffect(() => {
   
    axios.get('http://localhost:3000/api/sessions')
      .then(response => {
        setSessions(response.data);
        calculateTotalGrazingDuration(response.data); // total grazing duration
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

export default NewTable;
