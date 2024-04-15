import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for API requests
import PastureCard from '../../components/Grazing/PastureCard';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import GrazingSideBar from '../../components/Grazing/GrazingSideBar';
import GrazingDate from '../../components/Grazing/GrazingDate';
import Name from '../../components/Grazing/Name';


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
      <Box className="A">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'right',
            marginBottom: '20px',
          }}
        >
          
          
        </Box>
        <Box className="dashboard-content">
                <div align='center'></div>
                <GrazingDate/>
                <Name/>
              
              <Typography> Information regarding the  pasture maintainence is recorded here</Typography>
              
      </Box>
        <Box sx={{ textAlign: 'right', marginRight:'16px' }}>
          <Button variant="contained" color="primary" href="/pasture">
            See More
          </Button>
        </Box>
        <Container sx={{ margin: 25,marginTop: '20px'  }}>
          <Grid container spacing={7}>
            {pastures.map(pasture => (
              <Grid item xs={12} sm={6} md={6} lg={6} key={pasture._id} gap={20}>
                <PastureCard pasture={pasture}/>
              </Grid>
            ))}
          </Grid>
        </Container>
        
      </Box>
    </Box>
  );
}

export default PastureInfo;
