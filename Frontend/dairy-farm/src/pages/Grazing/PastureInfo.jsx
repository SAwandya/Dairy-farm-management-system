import React, { useState } from 'react';
import PastureCard from '../../components/Grazing/PastureCard';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import GrazingSideBar from '../../components/Grazing/GrazingSideBar';
import PastureForm from '../../components/Grazing/PastureForm'; // Import the PastureForm component

const pastures = [
  {
    id: 1,
    name: 'Pasture 1',
    photo: '../../../src/assets/cow1.png',
    area: '10 acres',
    fertilizerUsed: 'Organic',
    feedingCapacity: 'High',
    assignedEmployee: 'John Doe',
    typeOfPlantsPlanted: 'Grass',
  },
  {
    id: 2,
    name: 'Pasture 2',
    photo: '../../../src/assets/cow2.png',
    area: '8 acres',
    fertilizerUsed: 'Chemical',
    feedingCapacity: 'Medium',
    assignedEmployee: 'Jane Smith',
    typeOfPlantsPlanted: 'Clover',
  },
  {
    id: 3,
    name: 'Pasture 3',
    photo: '../../../src/assets/cow3.png',
    area: '8 acres',
    fertilizerUsed: 'Chemical',
    feedingCapacity: 'Medium',
    assignedEmployee: 'Jane Smith',
    typeOfPlantsPlanted: 'Clover',
  },
  {
    id: 4,
    name: 'Pasture 4',
    photo: '../../../src/assets/cow4.png',
    area: '8 acres',
    fertilizerUsed: 'Chemical',
    feedingCapacity: 'Medium',
    assignedEmployee: 'Jane Smith',
    typeOfPlantsPlanted: 'Clover',
  },
];

function PastureInfo() {
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
          <Typography variant="h4">Pastures</Typography>
          <Button variant="contained" color="primary" onClick={handleOpenFormDialog}>
            Add 
          </Button>
          <PastureForm open={openFormDialog} handleClose={handleCloseFormDialog} />
        </Box>
        <Container sx={{ margin: 0 }}>
          <Grid container spacing={2}>
            {pastures.map(pasture => (
              <Grid item xs={12} sm={6} md={6} lg={6} key={pasture.id} gap={20}>
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
