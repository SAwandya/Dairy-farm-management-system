import React from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import shehan from '../../assets/avatar.png';
import Sidebar from '../../components/Milking/MilkingSideBar';
import ReduceStockForm from '../../components/Supplier/ReduceStockForm'

const MilkingProfile = () => {
  const navigate = useNavigate();

  const handleLeave = () => {
    // Navigate to the leave form
    navigate(`/leaveform`);
  };

  const details = [
    { label: 'Name :', value: 'Shehan Wickramasooriya' },
    { label: 'NIC :', value: '200224500757' },
    { label: 'Employee ID :', value: 'EM04' },
    { label: 'Gender :', value: 'Male' },
    { label: 'Date of Birth :', value: '2002/09/01' },
    { label: 'Position :', value: 'Milking Manager' },
    { label: 'Work Experience :', value: 'Over 3 years' },
    { label: 'Address :', value: 'No. 24, Main Street, Colombo' },
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
              Hello, Mr. Shehan Wickramasooiya!
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
                src={shehan}
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
              marginRight: '86px',
              backgroundColor: '#38775B', 
              color: '#ffffff', 
            }}
            onClick={handleLeave}
          >
            Take a Leave
          </Button>
          <ReduceStockForm />
        </Box>
      </Container>
    </div>
  );
};

export default MilkingProfile;
