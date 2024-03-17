import React, { useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  Button,
  IconButton,
  Collapse,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MilkingSessionsTable = () => {
  const [openFormIndex, setOpenFormIndex] = useState(null);

  const handleRowClick = (index) => {
    setOpenFormIndex(index === openFormIndex ? null : index);
  };

  const sessionsData = [
    { id: 1, date: '2022-12-01', time: '09:00', cowGroups: 'Group A', status: 'Incomplete' },
    { id: 2, date: '2022-12-02', time: '10:00', cowGroups: 'Group B', status: 'Complete' },
    // Add more sessions data as needed
  ];

  return (
    <TableContainer component={Paper}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
        <div>
          <h2>Milking Sessions</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField label="Search" variant="outlined" />
          <IconButton>
            <CalendarTodayIcon />
          </IconButton>
        </div>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Session ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Cow Groups</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessionsData.map((session, index) => (
            <React.Fragment key={session.id}>
              <TableRow onClick={() => handleRowClick(index)} style={{ cursor: 'pointer' }}>
                <TableCell>{session.id}</TableCell>
                <TableCell>{session.date}</TableCell>
                <TableCell>{session.time}</TableCell>
                <TableCell>{session.cowGroups}</TableCell>
                <TableCell>{session.status}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5}>
                  <Collapse in={index === openFormIndex}>
                    <div>
                      {/* Form for incomplete sessions */}
                      {session.status === 'Incomplete' && (
                        <form>
                          <TextField label="Milk Batch ID" variant="outlined" fullWidth margin="normal" />
                          <TextField label="Milk Quantity" variant="outlined" fullWidth margin="normal" />
                          <TextField label="Milking Duration" variant="outlined" fullWidth margin="normal" />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Quality Check Result (Pass/Fail)"
                          />
                          <TextField label="Irregularities" variant="outlined" fullWidth margin="normal" />
                          <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>Submit</Button>
                          <Button variant="outlined">Cancel Session</Button>
                        </form>
                      )}
                    </div>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MilkingSessionsTable;
