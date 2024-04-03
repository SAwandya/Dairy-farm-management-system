import React from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

const MilkingDataTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Milk Batch ID</TableCell>
            <TableCell>Amount of Milk</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Quality Check Status</TableCell>
            <TableCell>Issues</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Replace this with your data mapping logic */}
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>12345</TableCell>
            <TableCell>10 liters</TableCell>
            <TableCell>30 minutes</TableCell>
            <TableCell>Pass</TableCell>
            <TableCell>No issues</TableCell>
          </TableRow>
          {/* Add more rows as needed */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MilkingDataTable;
