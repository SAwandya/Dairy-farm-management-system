import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for API requests
import PastureCard from '../../components/Grazing/PastureCard';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import GrazingSideBar from '../../components/Grazing/GrazingSideBar';


function PastureInfo() {
  const [pastures, setPastures] = useState([]);

  useEffect(() => {
    // Fetch pasture details from the backend API
    axios.get('http://localhost:3000/api/pastureDetails')
      .then(response => {
        setPastures(response.data);
      })
      .catch(error => {
        console.error('Error fetching pasture details:', error);
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
        <Typography align="center" variant="h4">Pastures</Typography>
        <Container sx={{ margin: 0 }}>
          <Grid container spacing={2}>
            {pastures.map(pasture => (
              <Grid item xs={12} sm={6} md={6} lg={6} key={pasture._id} gap={20}>
                <PastureCard pasture={pasture}/>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Button variant="contained" color="primary" href="http://localhost:5173/pasture">
            See More
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default PastureInfo;
