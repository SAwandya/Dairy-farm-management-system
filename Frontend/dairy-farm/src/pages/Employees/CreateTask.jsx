import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import CustomTextField from '../../components/Employees/textfield'; 
import em1 from '../../assets/em1.png';
import Esidebar from "../../components/Employees/esidebar";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function CreateTask() {
  const [taskID, setTaskID] = useState('');
  const [taskinfo, setTaskinfo] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'taskID':
        if (!value.startsWith("TS")) {
          return 'Task ID must start with "TS"!';
        }
        break;
      case 'employeeId':
        if (!value.startsWith("EM")) {
          return 'Employee ID must start with "EM"!';
        }
        break;
      default:
        break;
    }
    return '';
  };

  const handleBlur = (fieldName, value) => {
    const error = validateField(fieldName, value);
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: error,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    const validationErrors = [
      validateField('taskID', taskID),
      validateField('employeeId', employeeId)
      // Add more validation checks if needed
    ];

    // Check if there are any validation errors
    const hasErrors = validationErrors.some(error => error !== '');

    if (hasErrors || !taskinfo || !employeeName || !description || !status) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fix all validation errors and fill in all required fields!',
        });
        return;
    }

    axios.post("http://localhost:3000/api/employee/createTask", {
        taskID,
        taskinfo,
        employeeId,
        employeeName,
        description,
        status
      })
      .then(result => {
        console.log(result);
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Task created successfully!',
        }).then(() => {
            navigate('/task');
        });
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        });
      });
  };

  return (
    <div>
      <div style={{ display: 'flex', minWidth: '1036px' }}>
        <Esidebar/>
        <Box
          height={600}
          width={1000}
          my={4}
          display="flex"
          marginLeft="400px"
          alignItems="center"
          gap={2}
          p={2}
          sx={{ bgcolor: '#E7F1F7'}}
        >
          <img src={em1} alt="Employee" className="em1" style={{ width: '400px', height: '400px' }} />
          <Box>
            <Typography variant="h5" style={{ marginBottom: '20px', fontWeight: 'bold', fontStyle: 'poppins' }}>
              Create Tasks
            </Typography>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: '2rem',
                zIndex: 999,
                marginRight:'17rem'
              }}
            >
              <IconButton onClick={() => navigate('/task')} color="inherit">
                <CloseIcon />
              </IconButton>
            </Box>
            <form onSubmit={handleSubmit}>
              <CustomTextField
                id="taskID"
                label="Task ID"
                variant="outlined"
                value={taskID}
                onBlur={() => handleBlur('taskID', taskID)}
                onChange={(e) => setTaskID(e.target.value)}
                fullWidth
                className="custom-textfield"
                margin="normal"
              />
              <CustomTextField
                id="taskinfo"
                label="Task"
                variant="outlined"
                value={taskinfo}
                onChange={(e) => setTaskinfo(e.target.value)}
                fullWidth
                className="custom-textfield"
                margin="normal"
              />
              <CustomTextField
                id="employeeId"
                label="Employee ID"
                variant="outlined"
                value={employeeId}
                onBlur={() => handleBlur('employeeId', employeeId)}
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
              <CustomTextField
                id="description"
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                className="custom-textfield"
                margin="normal"
              />
                <FormControl fullWidth sx={{ marginTop: '20px', position: 'relative', width: '400px',marginLeft: '50px',}}>
  <InputLabel htmlFor="status" sx={{ position: 'absolute', top: '-10px', right: '-1500px', padding: '0 5px', zIndex: 1,width:'100px '}}>Status</InputLabel>
  <Select
    labelId="status-label"
    id="status"
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    variant="outlined"
    fullWidth
    margin="dense"
    label="Status"
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
    <MenuItem value="In progress">In Progress</MenuItem>
    <MenuItem value="Completed">Completed</MenuItem>
  </Select>
</FormControl>
              <Button
                type="submit"
                variant="contained"
                color="success"
                style={{ marginTop: '60px' }}
              >
                Create Task
              </Button>
            </form>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default CreateTask;
