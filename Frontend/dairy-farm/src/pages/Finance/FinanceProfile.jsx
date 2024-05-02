import React from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Rivin from '../../assets/Rivin.jpg';
import Sidebar from '../../components/Finance/Financesidebar'

const FinanceProfile = () => {
  const navigate = useNavigate();

  const handleLeave = () => {
    // Navigate to the leave form
    navigate(`/leaveform`);
  };

  const details = [
    { label: 'Name :', value: 'Rivin Jayasuriya' },
    { label: 'NIC :', value: '200032902019' },
    { label: 'Employee ID :', value: 'EM02' },
    { label: 'Gender :', value: 'Male' },
    { label: 'Date of Birth :', value: '2000/11/24' },
    { label: 'Position :', value: 'Finance Manager' },
    { label: 'Work Experience :', value: 'Over 6 years' },
    { label: 'Address :', value: 'No. 24, New Street, Colombo' },
  ];

  return (
    <div style={{ display: 'flex', minWidth: '1006px', overflow: 'hidden' }}>
      <Sidebar />
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
              Hello, Mr. Rivin Jayasuriya!
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
                src={Rivin}
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

export default FinanceProfile;
