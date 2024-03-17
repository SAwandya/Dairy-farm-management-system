import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CustomTextField from '../../components/Employees/textfield'; 
import em1 from '../../assets/em1.png';


function UpdateEmployee() {
  const { id } = useParams();
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [position, setPosition] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data and update state
    axios.get(`http://localhost:5000/getEmployee/${id}`)

      .then(result => {
       console.log(result)
       setEmployeeId(result.data.employeeId );
        setEmployeeName(result.data.employeeName );
        setPosition(result.data.position );
        setContactNumber(result.data.contactNumber);
        setEmail(result.data.email);
        setBasicSalary(result.data.basicSalary);
      })
      .catch(err => console.log(err));
  }, [id]);

  const update = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5000/updateEmployee/${id}`, { employeeId ,employeeName,position, contactNumber,  email,basicSalary})
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
         Update Employee
        </Typography>
        <form onSubmit={update}>
          <CustomTextField
            id="employeeId"
            label="Employee ID"
            variant="outlined"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            fullWidth
            className="custom-textfield"
            margin="normal"
            disabled={id ? true : false} // Disable editing of employeeId when updating
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
            {id ? 'Update Employee' : 'Add Employee'}
          </Button>
        </form>
      </Box>
    </Box>
  );

}
export default UpdateEmployee;