import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Popover, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomTextField from '../../components/Employees/textfield'; 
import { Close } from '@mui/icons-material'; // Import Close icon from MUI
function LeaveForm() {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null); // State for anchor element of popover

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if the start date is greater than the end date
    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Start date cannot be greater than end date");
      return;
    }
    
    // Check if the start date is earlier than today
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison
    if (new Date(startDate) < today) {
      toast.error("Start date cannot be earlier than today");
      return;
    }
    
    // Generate a unique leave ID on the server-side
    axios.post("http://localhost:3000/api/employee/submitLeave", {
      employeeId,
      employeeName,
      leaveType,
      reason,
      startDate,
      endDate
    })
    .then(result => {
      console.log(result);
      navigate('/eprofile'); // Navigate to LeaveDetails.jsx after successful submission
    })
    .catch(err => console.log(err));
  };

  return (
    <Box>
      <Typography variant="body2" color="error" sx={{ marginBottom: '20px', textAlign: 'center' }}>
        <ToastContainer /> 
      </Typography>
      <Button onClick={(e) => setAnchorEl(e.currentTarget)}>Open Leave Form</Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
            position: 'absolute',
          top: '40%',
          left: '50%',
           
        }}
        transformOrigin={{
            position: 'absolute',
            top: '40%',
        }}
      >
        <Box
          height={600}
          width={995}
          my={4}
          display="flex"
          alignItems="center"
          gap={2}
          p={2}
          sx={{ bgcolor: '#E7F1F7'}}
        >  
          <Box>
         
            <Typography variant="h5" style={{ marginBottom: '40px', fontWeight: 'bold', fontStyle: 'poppins' }}>
              Leave Form
            </Typography>
            <Button
  onClick={() => setAnchorEl(null)}
  sx={{
    position: 'absolute',
    top: '8px',
    right: '8px',
  }}
>
  <Close />
</Button>

            <form onSubmit={handleSubmit}>
              <CustomTextField
                id="employeeId"
                label="Employee ID"
                variant="outlined"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                fullWidth
                className="custom-textfield"
                margin="normal"
              />
              <CustomTextField
                id="employeeName"
                label="Employee Name"
                variant="outlined"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                fullWidth
                className="custom-textfield"
                margin="normal"
              />
              <FormControl fullWidth sx={{ marginTop: '20px', position: 'relative', width: '680px', marginLeft: '50px' }}>
                <InputLabel htmlFor="status" sx={{ position: 'absolute', top: '-10px', right: '-1500px', padding: '0 5px', zIndex: 1, width:'100px' }}>Status</InputLabel>
                <Select
                  labelId="leaveType"
                  id="leaveType"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  label="leaveType"
                  sx={{
                    '& .MuiInputLabel-outlined': {
                      transform: 'translate(14px, 12px) scale(1)',
                    },
                    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                      transform: 'translate(14px, -5px) scale(0.75)',
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '20px',
                    },
                    '& .MuiOutlinedInput-input': {
                      py: '15px',
                    },
                    borderRadius: '15px',
                  }}
                >
                  <MenuItem value="Medical">Medical</MenuItem>
                  <MenuItem value="Casual">Casual</MenuItem>
                </Select>
              </FormControl>
              <CustomTextField
                id="reason"
                label="Reason"
                variant="outlined"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                fullWidth
                className="custom-textfield"
                margin="normal"
              />
              <CustomTextField
                id="startDate"
                label="Start Date"
                type="date"
                variant="outlined"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <CustomTextField
                id="endDate"
                label="End Date"
                type="date"
                variant="outlined"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '50px', marginLeft:'400px' }}
              >
                Submit Leave
              </Button>
            </form>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}

export default LeaveForm;
