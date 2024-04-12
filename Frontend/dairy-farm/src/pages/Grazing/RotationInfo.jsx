import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for API requests
import RotationCard from '../../components/Grazing/RotationCard'; // Assuming you have created a RotationCard component
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import GrazingSideBar from '../../components/Grazing/GrazingSideBar';


function RotationInfo() {
  const [rotations, setRotations] = useState([]);

  useEffect(() => {
    // Fetch rotation details from the backend API
    axios.get('http://localhost:3000/api/sessions')
      .then(response => {
        setRotations(response.data);
      })
      .catch(error => {
        console.error('Error fetching rotation details:', error);
      });
  }, []);

  const [openFormDialog, setOpenFormDialog] = useState(false);

  const handleOpenFormDialog = () => {
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
  };

  return (
    <Box
      className="main-container"
      sx={{
        display: 'flex',
        minWidth: '1036px',
      }}
    >
      <GrazingSideBar />
      <Box className="dashboard-content2">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          
          
        </Box>
        <Typography align="center" variant="h5">Rotation Details</Typography>
        
        <Container sx={{ margin: 16,marginTop: '20px' }}>
          <Grid container spacing={7}>
            {rotations.map(rotation => (
              <Grid item xs={12} sm={6} md={6} lg={6} key={rotation._id} gap={20}>
                <RotationCard rotation={rotation}/>
              </Grid>
            ))}
          </Grid>
        </Container>
        
      </Box>
    </Box>
  );
}

export default RotationInfo;
