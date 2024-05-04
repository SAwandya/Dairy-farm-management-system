import React from 'react';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

const StatusLegend = () => {
  return (
    <Card sx={{ borderRadius: 5, padding: 1,height:'100px',width:'300px' }}>
      <CardContent>
        <Grid2 container spacing={2}>
          <Grid2 item sm={4}>
            
                <Avatar sx={{ bgcolor: 'yellow', width: 24, height:24 }}>.</Avatar>
                <Typography variant="body2" fontWeight="bold">Sold Out</Typography>
            
          </Grid2>
          <Grid2 item sm={4}>
            
                <Avatar sx={{ bgcolor: 'blue', width: 24, height: 24 }}>.</Avatar>
                <Typography variant="body2" fontWeight="bold">Released</Typography>
             
          </Grid2>
          <Grid2 item sm={4}>
           
                <Avatar sx={{ bgcolor: 'grey', width: 24, height: 24 }}>.</Avatar>
                <Typography variant="body2" fontWeight="bold">In Stock</Typography>
             
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default StatusLegend;
