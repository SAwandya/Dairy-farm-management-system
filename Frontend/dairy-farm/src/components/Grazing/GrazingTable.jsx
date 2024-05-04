import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import { Box, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';  //already added 

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.breakpoints.up('sm')} `]: {
    fontSize: '1rem',
    fontFamily: 'Poppins, sans-serif'
  },
  [`&.${theme.breakpoints.down('sm')} `]: {
    fontSize: '0.8rem',
    fontFamily: 'Poppins, sans-serif'
  },
  backgroundColor: '#EAEAEA',
  color: theme.palette.common.black,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledTableContainer = styled(TableContainer)({
  margin: '0 auto',
  maxWidth: '1200px', 
});

function GrazingTable({ rows, headers }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const sortedRows = order === 'asc'
    ? [...rows].sort((a, b) => (a[orderBy] > b[orderBy] ? 1 : -1))
    : [...rows].sort((a, b) => (b[orderBy] > a[orderBy] ? 1 : -1));

  const filteredRows = sortedRows.filter(row =>
    Object.values(row).some(value =>
      value && value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <Box mt={4} display="flex" flexDirection="column" alignItems="center">
      <div>
        <TextField
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={handleSearch}
          style={{ marginBottom: '1rem',  }}
        />
      </div>
      
      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <StyledTableCell key={index}>
                  <TableSortLabel
                    active={orderBy === header}
                    direction={orderBy === header ? order : 'asc'}
                    onClick={() => handleRequestSort(header)}
                  >
                    {header}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
              
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
              <StyledTableRow key={rowIndex}>
                {Object.values(row).map((value, colIndex) => (
                  <StyledTableCell key={colIndex} align="left">
                    {value}
                  </StyledTableCell>
                ))}
                
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={headers.length + 1} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ marginTop: '1rem' }}
      />
    </Box>
  );
}

export default GrazingTable;
