import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';

const columns = [
  { id: 'id', label: 'ID'},
  { id: 'equipment', label: 'Equipment'},
  { id: 'total', label: 'Total'},
  { id: 'available', label: 'Available'}

  
];

const rows = [
  { id: 1, equipment: 'Freezers', total: 10, available:3 },
  { id: 2, equipment: 'Mixers', total: 20, available:8  },
 { id: 3, equipment: 'Homogenizers ', total: 15, available:3  },
  { id: 1, equipment: 'Pasteurizers', total: 10 , available:6 },
  { id: 2, equipment: 'Separators ', total: 20 , available:7 },
  { id: 3, equipment: 'Filling Machines', total: 15 , available:4 },
  { id: 1, equipment: 'Capping Machines', total: 10 , available:2 },
  { id: 2, equipment: 'Boiler ', total: 20, available:3  },
  { id: 3, equipment: 'pH Meters', total: 15, available:3  },
  { id: 1, equipment: 'Shelving Units', total: 10 , available:5 },
  { id: 2, equipment: 'Boiler', total: 20, available:15  },
  { id: 3, equipment: 'Separators', total: 15 , available:3 },
  { id: 1, equipment: 'Homogenizers', total: 10, available:3  },
{ id: 2, equipment: 'Freezers', total: 20 , available:3 },
  { id: 3, equipment: 'Boiler', total: 15, available:3  }
  
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
    <Paper sx={{ ml: 2,mt: '20px',mr:4, borderRadius: 5, maxWidth: '100%', overflow: 'hidden',height: '100%',maxHeight: '70vh' }}>
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
