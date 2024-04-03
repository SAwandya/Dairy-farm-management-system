import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomTextField from '../../components/Employees/textfield'; 
import em1 from '../../assets/em1.png'
import Esidebar from "../../components/Employees/esidebar";
import Swal from 'sweetalert2';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function CreateEmployee() {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [position, setPosition] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [existingEmployeeIds, setExistingEmployeeIds] = useState([]);
  const [errors, setErrors] = useState({});


  




const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
        try {
            // Check if the employee ID already exists
            if (existingEmployeeIds.includes(employeeId)) {
                setErrors({ employeeId: 'Employee ID already exists' });
                return;
            }

            // Make the API call to create the employee
            const response = await axios.post("http://localhost:3000/api/employee/createEmployee", {
                employeeId,
                // Other employee data
            });

            // Handle the response from the API
            if (response.data.success) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully added",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/employeedashboard');
            } else {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Successfully added",
                  showConfirmButton: false,
                  timer: 1500
                });
                navigate('/employeedashboard');
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    }
};
  

  const validateForm = () => {
    const errors = {};
    if (!/^[E][M]\d{1,}$/.test(employeeId)) {
      errors.employeeId = 'Invalid employee ID. Format: EMxx';
    }
    if (!employeeName) {
      errors.employeeName = 'Employee Name is required';
    }
    if (!position) {
      errors.position = 'Position is required';
    }
    if (!/^\d{10}$/.test(contactNumber)) {
      errors.contactNumber = 'Contact Number must be 10 digits';
    }
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Invalid email format';
    } else if (!email.endsWith('@gmail.com')) {
      errors.email = 'Email must be a Gmail address';
    }
    if (isNaN(basicSalary) || basicSalary <= 0) {
      errors.basicSalary = 'Basic Salary must be a number greater than 0';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div>
      <div style={{ display: 'flex', minWidth: '1036px' }}>
        <Esidebar/>
        <Box
          height={550}
          width={1000}
          my={4}
          display="flex"
          marginLeft="350px"
          alignItems="center"
          gap={2}
          p={2}
          sx={{ bgcolor: '#E7F1F7'}}
        >
          <img src={em1} alt="Employee" className="em1" style={{ width: '400px', height: '400px' }} />
          <Box
          >
          
            <Typography variant="h5" style={{ marginBottom: '20px', fontWeight: 'bold', fontStyle: 'poppins' }}>
              Add Employee
            </Typography>
            <Box
    sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        padding: '2rem',
        zIndex: 999,
        marginRight:'19rem'
    }}
>
    <IconButton onClick={() => navigate('/task')} color="inherit">
        <CloseIcon />
    </IconButton>
</Box>
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
                error={!!formErrors.employeeId}
                helperText={formErrors.employeeId}
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
                error={!!formErrors.employeeName}
                helperText={formErrors.employeeName}
              />
              <CustomTextField
                id="position"
                label="Position"
                variant="outlined"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                fullWidth
                margin="normal"
                error={!!formErrors.position}
                helperText={formErrors.position}
              />
              <CustomTextField
                id="contactNumber"
                label="Contact Number"
                variant="outlined"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                fullWidth
                margin="normal"
                error={!!formErrors.contactNumber}
                helperText={formErrors.contactNumber}
              />
              <CustomTextField
                id="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                error={!!formErrors.email}
                helperText={formErrors.email}
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
                error={!!formErrors.basicSalary}
                helperText={formErrors.basicSalary}
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
      </div>
    </div>
  );
}

export default CreateEmployee;
