import React, { useState, useEffect } from 'react';
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
  const [sessionsData, setSessionsData] = useState([]);

  useEffect(() => {
    fetchSessionsData();
  }, []);

  const fetchSessionsData = () => {
    fetch('http://localhost:3000/api/milkingSessions')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setSessionsData(data.data); // Update state with fetched data
        } else {
          console.error('Failed to fetch milking sessions:', data.error);
        }
      })
      .catch(error => console.error('Error fetching milking sessions:', error));
  };

  const handleRowClick = (index) => {
    setOpenFormIndex(index === openFormIndex ? null : index);
  };

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
            <TableCell>Cow Group</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessionsData.map((session, index) => (
            <React.Fragment key={session._id}>
              <TableRow onClick={() => handleRowClick(index)} style={{ cursor: 'pointer' }}>
                <TableCell>{session.sessionId}</TableCell>
                <TableCell>{session.date}</TableCell>
                <TableCell>{session.time}</TableCell>
                <TableCell>{session.cowGroup}</TableCell>
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
