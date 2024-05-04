import React from 'react';
import { Card, CardContent, Typography, Avatar,Tooltip } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

const StatusLegend = () => {
  return (
    <Card sx={{ borderRadius: 5, padding: 2,height:'100px',width:'300px' }}>
      <CardContent sx={{ml:2}}>
        <Grid2 container spacing={2}>
          <Grid2 item sm={4}  align="left">
          <Tooltip title="Product Batch Sold Out! Cannot Unrelease" arrow>
                <Avatar sx={{ bgcolor: '#a86432', width: 24, height:24 }}>.</Avatar>
                <Typography variant="body2" fontWeight="bold">Sold Out</Typography>
            </Tooltip>
          </Grid2>
          <Grid2 item sm={4}>
            <Tooltip title="Product Batch Released" arrow>
                <Avatar sx={{ bgcolor: '#2196f3', width: 24, height: 24 }}>.</Avatar>
                <Typography variant="body2" fontWeight="bold">Released</Typography>
            </Tooltip>
          </Grid2>
          <Grid2 item sm={4}>
            <Tooltip title="Product Batch is in Stock" arrow>
                <Avatar sx={{ bgcolor: 'grey', width: 24, height: 24 }}>.</Avatar>
                <Typography variant="body2" fontWeight="bold">In Stock</Typography>
            </Tooltip> 
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default StatusLegend;
