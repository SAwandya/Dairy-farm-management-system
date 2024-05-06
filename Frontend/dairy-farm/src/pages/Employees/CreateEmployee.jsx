import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import CustomTextField from '../../components/Employees/textfield'; 
import em1 from '../../assets/em1.png';
import Esidebar from "../../components/Employees/esidebar";

function CreateEmployee() {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [position, setPosition] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const navigate = useNavigate();

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'employeeId':
        if (!/^[E][M]\d{1,}$/.test(value)) {
          return 'Invalid employee ID. Format: EMxx';
        }
        break;
      case 'contactNumber':
        if (!/^\d{10}$/.test(value)) {
          return 'Contact Number must be 10 digits';
        }
        break;
      case 'email':
        if (!/^\S+@\S+\.\S+$/.test(value)) {
          return 'Invalid email format';
        }
        break;
      case 'basicSalary':
        if (isNaN(value) || value <= 0) {
          return 'Basic Salary must be a number greater than 0';
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
    if (validateForm()) {
      // Form is valid, proceed with submission
      axios.post("http://localhost:3000/api/employee/createEmployee", {
        employeeId,
        employeeName,
        position,
        contactNumber,
        email,
        basicSalary
      })
      .then(result => {
        console.log(result);
        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Employee added successfully!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        navigate('/allemployee');
      })
      .catch(err => {
        console.log(err);
        // Show error message
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to add employee!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      });
    } else {
      // Form is invalid, show error toast message
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fix all validation errors!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };
  
  const validateForm = () => {
    let isValid = true;
  
    // Check for individual field validations
    if (!/^[E][M]\d{1,}$/.test(employeeId)) {
      isValid = false;
    }
  
    if (!employeeName) {
      isValid = false;
    }
  
    if (!position) {
      isValid = false;
    }
  
    if (!/^\d{10}$/.test(contactNumber)) {
      isValid = false;
    }
  
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      isValid = false;
    }
  
    if (isNaN(basicSalary) || basicSalary <= 0) {
      isValid = false;
    }
  
    return isValid;
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
          <Box>
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
                marginRight:'8rem'
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
                onBlur={() => handleBlur('employeeName', employeeName)}
                onChange={(e) => setEmployeeName(e.target.value)}
                fullWidth
                className="custom-textfield"
                margin="normal"
              />
              <CustomTextField
                id="position"
                label="Position"
                variant="outlined"
                value={position}
                onBlur={() => handleBlur('position', position)}
                onChange={(e) => setPosition(e.target.value)}
                fullWidth
                className="custom-textfield"
                margin="normal"
              />
              <CustomTextField
                id="contactNumber"
                label="Contact Number"
                variant="outlined"
                value={contactNumber}
                onBlur={() => handleBlur('contactNumber', contactNumber)}
                onChange={(e) => setContactNumber(e.target.value)}
                fullWidth
                className="custom-textfield"
                margin="normal"
              />
              <CustomTextField
                id="email"
                label="Email"
                variant="outlined"
                value={email}
                onBlur={() => handleBlur('email', email)}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                className="custom-textfield"
                margin="normal"
              />
              <CustomTextField
                id="basicSalary"
                label="Basic Salary"
                variant="outlined"
                type="number"
                value={basicSalary}
                onBlur={() => handleBlur('basicSalary', basicSalary)}
                onChange={(e) => setBasicSalary(e.target.value)}
                fullWidth
                className="custom-textfield"
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
      </div>
    </div>
  );
}

export default CreateEmployee;
