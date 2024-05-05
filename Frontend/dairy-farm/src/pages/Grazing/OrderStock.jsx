import React from 'react';
import ReduceStockForm from '../../components/Supplier/ReduceStockForm';
import { Container, Box, Button, Typography, Card, CardContent, CardMedia } from '@mui/material';
import GrazingDate from '../../components/Grazing/GrazingDate';
import Name from '../../components/Grazing/Name';
import GrazingSideBar from '../../components/Grazing/GrazingSideBar';
import pastureImage from '../../assets/clean.jpeg';

function OrderStock() {
  return (
    <div>
      <Box className="dashboard-content">
        <div align='center'></div>
        <GrazingDate/>
        <Name/>
        <Typography> Order stocks for the maintenance of relevant pastures</Typography>
        
        <Card >
            <CardMedia
              component="img"
              height="430"
              width={100}
              image={pastureImage}
              alt="Pasture Image"
            />
            <CardContent align='center'>
              <ReduceStockForm />
              
            </CardContent>
          </Card>

      </Box>

      <GrazingSideBar sx={{ position: 'fixed', left: 0, top: 0, height: '100vh' }} />

    </div>
  );
}

export default OrderStock;
