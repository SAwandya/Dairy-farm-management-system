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
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const MilkingSessionsTable = () => {
  const [openFormIndex, setOpenFormIndex] = useState(null);
  const [sessionsData, setSessionsData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [showCalendar, setShowCalendar] = useState(false); // State to control calendar display
  const [showAddForm, setShowAddForm] = useState(false); // State to control visibility of Add form
  const [showEditForm, setShowEditForm] = useState(false); // State to control visibility of Edit form

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

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const toggleAddForm = (index) => {
    setOpenFormIndex(index === openFormIndex ? null : index);
    setShowAddForm(!showAddForm);
  };

  const toggleEditForm = (index) => {
    setOpenFormIndex(index === openFormIndex ? null : index);
    setShowEditForm(!showEditForm);
  };

  const filteredSessions = sessionsData.filter(session => session.sessionId.toString().includes(searchInput));

  return (
    <TableContainer component={Paper}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
        <div>
          <h2>Milking Sessions</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Search by Session ID"
            variant="outlined"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <IconButton onClick={toggleCalendar}> {/* Toggle calendar visibility */}
            <CalendarTodayIcon />
          </IconButton>
        </div>
      </div>
      <Dialog open={showCalendar} onClose={toggleCalendar}> {/* Dialog to display calendar */}
        <DialogTitle>Select Date</DialogTitle>
        <DialogContent>
          {/* Place your calendar component here */}
          {/* For demonstration purpose, you can replace this with your desired calendar component */}
          <div style={{ padding: '10px', backgroundColor: 'lightgray' }}>
            This is where your calendar component will be displayed.
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleCalendar} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
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
