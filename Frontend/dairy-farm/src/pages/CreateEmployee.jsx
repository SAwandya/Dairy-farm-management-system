import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomTextField from '../components/textfield'; 
import em1 from '../assets/em1.png';

function CreateEmployee() {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [position, setPosition] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

     axios.post("http://localhost:5000/createEmployee", {
      employeeId,
        employeeName,
        position,
        contactNumber,
        email,
        basicSalary
      })
      .then(result => {
        console.log(result);
        navigate('/employeedashboard');
      })
      .catch(err => console.log(err));
    
  };

  return (
    <Box
      height={500}
      width={1000}
      my={4}
      display="flex"
      marginLeft="220px"
      alignItems="center"
      gap={2}
      p={2}
      sx={{ bgcolor: '#E7F1F7'}}
    >
      <img src={em1} alt="Employee" className="em1" style={{ width: '400px', height: '400px' }} />
      <Box>
        <Typography variant="h5" style={{ marginBottom: '20px', fontWeight: 'bold', fontStyle: 'poppins' }}>
          Add Employee
        </Typography>
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
            margin="normal"
            className="custom-textfield"
          />
          <CustomTextField
            id="position"
            label="Position"
            variant="outlined"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            fullWidth
            margin="normal"
          />
          <CustomTextField
            id="contactNumber"
            label="Contact Number"
            variant="outlined"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            fullWidth
            margin="normal"
          />
          <CustomTextField
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <CustomTextField
            id="basicSalary"
            label="Basic Salary"
            variant="outlined"
            type="number"
            value={basicSalary}
            onChange={(e) => setBasicSalary(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            style={{ marginTop: '10px' }}
          >
            Add Employee
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default CreateEmployee;
