import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';

const columns = [
  { id: 'id', label: 'ID'},
  { id: 'equipment', label: 'Equipment'},
  { id: 'total', label: 'Total'},
  { id: 'available', label: 'Available'}

  
];

const rows = [
  { id: 1, equipment: 'Apple', total: 10, available:3 },
  { id: 2, equipment: 'Banana', total: 20, available:3  },
 { id: 3, equipment: 'Orange', total: 15, available:3  },
  { id: 1, equipment: 'Apple', total: 10 , available:3 },
  { id: 2, equipment: 'Banana', total: 20 , available:3 },
  { id: 3, equipment: 'Orange', total: 15 , available:3 },
  { id: 1, equipment: 'Apple', total: 10 , available:3 },
  { id: 2, equipment: 'Banana', total: 20, available:3  },
  { id: 3, equipment: 'Orange', total: 15, available:3  },
  { id: 1, equipment: 'Apple', total: 10 , available:3 },
  { id: 2, equipment: 'Banana', total: 20, available:3  },
  { id: 3, equipment: 'Orange', total: 15 , available:3 },
  { id: 1, equipment: 'Apple', total: 10, available:3  },
{ id: 2, equipment: 'Banana', total: 20 , available:3 },
  { id: 3, equipment: 'Orange', total: 15, available:3  }
  
];

const StickyHeadTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ ml: 4,mt: '20px',mr:2, borderRadius: 5, maxWidth: '100%', overflow: 'hidden',height: '100%',maxHeight: '70vh' }}>
      <TableContainer sx={{ maxHeight: '70vh' }}>
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
            {rows
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default StickyHeadTable;
