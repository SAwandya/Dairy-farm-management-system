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
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const MilkingSessionsTable = () => {
  const [openFormIndex, setOpenFormIndex] = useState(null);
  const [sessionsData, setSessionsData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchSessionsData();
  }, []);

  const fetchSessionsData = () => {
    fetch('http://localhost:3000/api/milkingSessions')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setSessionsData(data.data);
        } else {
          console.error('Failed to fetch milking sessions:', data.error);
        }
      })
      .catch(error => console.error('Error fetching milking sessions:', error));
  };

  const toggleAddForm = (index) => {
    setOpenFormIndex(index === openFormIndex ? null : index);
    setShowAddForm(!showAddForm);
  };

  const toggleEditForm = (index) => {
    setOpenFormIndex(index === openFormIndex ? null : index);
    setShowEditForm(!showEditForm);
  };

  const filteredSessions = sessionsData.filter(session => {
    if (!selectedDate) {
      const today = new Date();
      const sessionDate = new Date(session.date);
      sessionDate.setHours(0, 0, 0, 0);
  
      return (
        today.getFullYear() === sessionDate.getFullYear() &&
        today.getMonth() === sessionDate.getMonth() &&
        today.getDate() === sessionDate.getDate()
      );
    } else {
      const sessionDate = new Date(session.date);
      sessionDate.setHours(0, 0, 0, 0);
  
      const selectedDateMidnight = new Date(selectedDate);
      selectedDateMidnight.setHours(0, 0, 0, 0);
  
      return (
        sessionDate.getFullYear() === selectedDateMidnight.getFullYear() &&
        sessionDate.getMonth() === selectedDateMidnight.getMonth() &&
        sessionDate.getDate() === selectedDateMidnight.getDate()
      );
    }
  });
  

  return (
    <TableContainer component={Paper}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
        <div>
          <h2>Milking Sessions</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </LocalizationProvider>
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Cow Group</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSessions.map((session, index) => (
            <React.Fragment key={session._id}>
              <TableRow style={{ cursor: 'pointer' }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{new Date(session.date).toISOString().split('T')[0]}</TableCell>
                <TableCell>{session.time}</TableCell>
                <TableCell>{session.cowGroup}</TableCell>
                <TableCell>{session.status}</TableCell>
                <TableCell>
                  <>
                    {session.status === 'Incomplete' && (
                      <>
                        <IconButton onClick={() => toggleAddForm(index)}>
                          <AddCircleOutlineIcon />
                        </IconButton>
                        <IconButton onClick={() => toggleEditForm(index)}>
                          <EditIcon />
                        </IconButton>
                      </>
                    )}
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={6}>
                  <Collapse in={index === openFormIndex}>
                    <div>
                      {/* Form for adding sessions */}
                      {showAddForm && (
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
                      {/* Form for editing sessions */}
                      {showEditForm && (
                        <form>
                          <TextField label="Edit Milk Batch ID" variant="outlined" fullWidth margin="normal" />
                          <TextField label="Edit Milk Quantity" variant="outlined" fullWidth margin="normal" />
                          <TextField label="Edit Milking Duration" variant="outlined" fullWidth margin="normal" />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Edit Quality Check Result (Pass/Fail)"
                          />
                          <TextField label="Edit Irregularities" variant="outlined" fullWidth margin="normal" />
                          <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>Update</Button>
                          <Button variant="outlined">Cancel</Button>
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
