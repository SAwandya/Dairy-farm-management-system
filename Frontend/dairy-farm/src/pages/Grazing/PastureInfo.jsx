import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for API requests
import PastureCard from '../../components/Grazing/PastureCard';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import GrazingSideBar from '../../components/Grazing/GrazingSideBar';
import GrazingDate from '../../components/Grazing/GrazingDate';
import Name from '../../components/Grazing/Name';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';


function PastureInfo() {
  const [pastures, setPastures] = useState([]);

  useEffect(() => {
    
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
        <container >
        <Box className="dashboard-content">
                <div align='center'></div>
                <GrazingDate/>
                <Name/>
              <Typography> Information regarding the  pasture maintainence is recorded here</Typography>
              
        </Box>
        </container>
       

        

        <Container sx={{ margin: 25,marginTop: '20px'  }}>

        <Box sx={{ textAlign: 'right', marginRight:'25px' }}>
        <Button variant="contained" style={{ backgroundColor: '#1a6952' }} href="/pasture">
         Pasture Table
        </Button>
        </Box>
          <Grid2 container spacing={8} marginTop={4}>
            {pastures.map(pasture => (
              <Grid2 item xs={7} sm={6} md={7} lg={6} key={pasture._id} gap={50}>
                <PastureCard pasture={pasture}/>
              </Grid2>
            ))}
          </Grid2>
        </Container>
        
      </Box>
    </Box>
  );
}

export default PastureInfo;
