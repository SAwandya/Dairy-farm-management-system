import React from 'react';
import { Container, Box, Button, Popover, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import disara from '../../assets/disara.png';
import Esidebar from "../../components/Employees/esidebar";
const EProfile = () => {
  const navigate = useNavigate();

  const handleLeave = () => {
    // Navigate to the leave form with the employeeId as a parameter in the URL
    navigate(`/leaveform`);
  };

  const details = [
    { label: 'Name', value: 'Disara' },
    { label: 'NIC', value: '2001851029931' },
    { label: 'Employee ID', value: 'EM001' },
    { label: 'Gender', value: 'Female' },
    { label: 'Date of Birth', value: '2001/12/16' },
    { label: 'Position', value: 'HR Manager' },
    { label: 'Work Experience', value: 'Over 5 years' },
    { label: 'Address', value: 'No. 24, Main Street, Colombo' },
  ];

  return (
    <div style={{ display: 'flex', minWidth: '1036px',overflow: 'hidden'  }}>
    <Esidebar/>
    <Container>
        <Box
          style={{
            background: 'white',
            marginLeft: '100px',
            border: '1px solid #ddd',
            padding: '20px',
            width: '100%',
            height: '540px',
            borderRadius: '15px',
            marginTop: '80px',
          }}
        >
          <Box style={{ padding: '16px', borderRadius: '8px', marginBottom: '6px' }}>
            <Typography
              variant="h4"
              style={{
                marginBottom: '16px',
                fontFamily: 'Poppins',
                fontWeight: 'bold',
                color: '#252B48',
                fontSize: '32px',
              }}
            >
            Hello, Miss Disara!
          </Typography>
          <Typography
              variant="h5"
              style={{
                marginBottom: '16px',
                fontFamily: 'Poppins',
                color: '#252B48',
                fontSize: '16px',
              }}
            >
              Take a look at your profile details
            </Typography>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={disara}
                alt="Profile"
                style={{
                  width: '300px',
                  height: '300px',
                  borderRadius: '50%',
                  marginRight: '16px',
                }}
              />
              <div>
                {details.map(({ label, value }, index) => (
                  <Box key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                      variant="h6"
                      style={{
                        color: '#252B48',
                        marginLeft:'120px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        fontFamily: 'Poppins',
                        marginRight: '180px',
                      }}
                    >
                      {label}
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{
                        color: '#252B48',
                        fontSize: '20px',
                        fontFamily: 'Poppins',
                      }}
                    >
                      {value}
                    </Typography>
                  </Box>
                ))}
              </div>
            </Box>
          </Box>
          <Button
            variant="contained"
            style={{
              marginTop: '16px',
              backgroundColor: '#38775B', 
              color: '#ffffff', 
            }}
            onClick={handleLeave}
          >
            Take a Leave
          </Button>
        </Box>
      </Container>
    </div>
  );
};
export default EProfile;
