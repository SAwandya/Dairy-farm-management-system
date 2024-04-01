import React from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

function MyTable() {
  // Example data for the table
  const rows = [
    { id: 1, name: 'John Doe', age: 30, city: 'New York' },
    { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
    { id: 3, name: 'Tom Brown', age: 35, city: 'Chicago' },
    { id: 1, name: 'John Doe', age: 30, city: 'New York' },
    { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
    { id: 3, name: 'Tom Brown', age: 35, city: 'Chicago' },
    { id: 1, name: 'John Doe', age: 30, city: 'New York' },
    { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
    { id: 3, name: 'Tom Brown', age: 35, city: 'Chicago' },
  ];

  return (
   
      <Card sx={{ m: 2, borderRadius: 5, width: '95%' }}>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>City</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>{row.city}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
  );
}

export default MyTable;
