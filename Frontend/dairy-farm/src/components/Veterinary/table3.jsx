import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.breakpoints.up('sm')} `]: {
    fontSize: '3rem',
    fontFamily: 'Poppins, sans-serif'
  },
  [`&.${theme.breakpoints.down('sm')} `]: {
    fontSize: '2rem',
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
  maxWidth: '100%', 
});

function CustomizedTables2(props) {
  const { rows, headers } = props;

  return (
    <StyledTableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <StyledTableCell key={index}>{header}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {Object.values(row).map((value, colIndex) => (
                <StyledTableCell key={colIndex} align="left">
                  {value}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}

export default CustomizedTables2;
