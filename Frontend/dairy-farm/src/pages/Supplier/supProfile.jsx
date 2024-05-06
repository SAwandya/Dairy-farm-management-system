import React,{ useState }  from 'react';
import { Container, Box, Button, Popover, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import duvini from '../../assets/Thusala.jpeg';
import Sidebar from '../../components/Supplier/SupplierSideBar';
import LeaveForm from "../../components/Employees/leaveform"
import QRCodeScanner from '../../components/Employees/QRCodeScanner';
const supProfile = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null); // State for anchor element of popover

  const handleLeave = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element when the button is clicked
  };

  const handleClose = () => {
    setAnchorEl(null); // Close popover
  };
  const open = Boolean(anchorEl);

  const details = [
    { label: 'Name :', value: 'Thusala Piyarisi' },
    { label: 'NIC :', value: '200227302698' },
    { label: 'Employee ID :', value: 'EM05' },
    { label: 'Gender :', value: 'Male' },
    { label: 'Date of Birth :', value: '2002/09/29' },
    { label: 'Position :', value: 'Inventory Manager' },
    { label: 'Work Experience :', value: 'Over 2 years' },
    { label: 'Address :', value: 'No. 27, Flower Street, Colombo' },
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
              Hello, Mr Thusala Piyarisi
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
                src={duvini}
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
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box>
              <LeaveForm /> {/* Render LeaveForm component inside the Popover */}
            </Box>
          </Popover>
          <div style={{ position: 'fixed', top: '530px', right: '170px' }}>
  <QRCodeScanner />
</div>
        </Box>

      </Container>
    </div>
  );
};

export default supProfile;
