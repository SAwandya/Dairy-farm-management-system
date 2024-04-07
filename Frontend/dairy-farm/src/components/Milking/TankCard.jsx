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
      <CardContent sx={{paddingTop: '0'}}>
        <TankStructure percentage={percentage}/>
        <div className='tank-details'>
            <div className='tank-detail'>
                <Typography variant="h6" fontFamily={'Poppins'} fontSize={'18px'}>Capacity:</Typography>
                <Typography variant="h6" fontFamily={'Poppins'} fontSize={'18px'}>{capacity} Litres</Typography>
            </div>
            <div className='tank-detail'>
                <Typography variant="h6" fontFamily={'Poppins'} fontSize={'18px'}>Available Milk:</Typography>
                <Typography variant="h6" fontFamily={'Poppins'} fontSize={'18px'}>{availableMilk} Litres</Typography>
            </div>
            <div className='tank-detail'>
                <Typography variant="h6" fontFamily={'Poppins'} fontSize={'18px'}>Stored Milk Batches:</Typography>
                <Typography variant="h6" fontFamily={'Poppins'} fontSize={'18px'}>{storedBatches.join(', ')}</Typography>
            </div>
          
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '16px'}}>
            <Button
                variant="text"
                aria-label="edit"
                style={{
                    fontWeight: 'bold',
                    fontFamily: 'Poppins',
                    backgroundColor: '#38775B',
                    color: '#fff',
                    width: '160px',
                    borderRadius: '15px'
                }}
            >
              Edit
            </Button>
            <Button
                variant="text"
                aria-label="delete"
                style={{
                    fontWeight: 'bold',
                    fontFamily: 'Poppins',
                    backgroundColor: '#F3797E',
                    color: '#fff',
                    width: '160px',
                    borderRadius: '15px'
                }}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TankCard;
