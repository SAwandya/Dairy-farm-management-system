import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/system';

const columns = [
  { id: 'id', label: 'ID'},
  { id: 'name', label: 'Name'},
  { id: 'quantity', label: 'Quantity'},
];

const rows = [
  { id: 1, name: 'Chocolate Powder', quantity: 10 },
  { id: 2, name: ' Vanilla', quantity: 20 },
  { id: 3, name: 'Sprinkles', quantity: 15 },
  { id: 1, name: 'Eggs', quantity: 10 },
  { id: 2, name: 'Sugar', quantity: 20 },
  { id: 3, name: 'Whipped Cream', quantity: 15 },
  { id: 1, name: 'Essence', quantity: 10 },
  { id: 2, name: 'Vegetable Oil', quantity: 20 },
  { id: 3, name: 'Orange Sprinkles', quantity: 15 },
  { id: 1, name: 'Apple', quantity: 10 },
  { id: 2, name: 'Banana', quantity: 20 },
  { id: 3, name: 'Eggs', quantity: 15 },
  { id: 1, name: 'Apple', quantity: 10 },
  { id: 2, name: 'Banana', quantity: 20 }, 
  { id: 3, name: 'Orange', quantity: 15 },
];

const CustomTableContainer = styled(TableContainer)({
  '&::-webkit-scrollbar': {
    display: 'none',  /* Hide scrollbar for Chrome, Safari, and Opera */
  },
  msOverflowStyle: 'none',  /* Hide scrollbar for IE and Edge */
  scrollbarWidth: 'none',  /* Hide scrollbar for Firefox */
});

const StickyHeadTable = () => {
  return (
    <Paper sx={{ ml:2, mt: '20px', borderRadius: 5, width: '100%', overflow: 'hidden', height: '100%', maxHeight: '70vh' }}>
      <CustomTableContainer sx={{ height: '70vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomTableContainer>
    </Paper>
  );
}

export default StickyHeadTable;
