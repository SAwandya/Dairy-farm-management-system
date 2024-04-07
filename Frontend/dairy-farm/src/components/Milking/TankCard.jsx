import React from 'react';
import { Card, CardContent, CardHeader, Typography, Grid, Button } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import TankStructure from './TankStructure';

const TankCard = ({ tank }) => {
  const { tankId, capacity, availableMilk, storedBatches } = tank;
  const percentage = (availableMilk / capacity);

  return (
    <Card sx={{ width: 370, height: 420}} style={{borderRadius: '15px', backgroundColor: '#A8C7FF'}} >
      <Typography className="tankTitle" variant='h6' style={{textAlign: 'center', marginTop: '10px'}}>Tank ID: {tankId}</Typography>
      <CardContent>
        <TankStructure percentage={percentage} style={{margin: 'auto'}}/>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} sx={{ height: 200, bgcolor: 'grey.300', borderRadius: 1 }}></Grid> */}
          
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">Capacity: {capacity} Litres</Typography>
            <Typography variant="body2" color="textSecondary">Available Milk: {availableMilk} Litres</Typography>
            <Typography variant="body2" color="textSecondary">Stored Milk Batches: {storedBatches.join(', ')}</Typography>
          </Grid>
          
          <Grid item xs={12} sx={{ textAlign: 'right' }}>
            <Button variant="text" color="primary" startIcon={<EditIcon />} aria-label="edit">
              Edit
            </Button>
            <Button variant="text" color="error" startIcon={<DeleteIcon />} aria-label="delete">
              Delete
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TankCard;
