import React from 'react';
import ReduceStockForm from '../../components/Supplier/ReduceStockForm';
import { Container, Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import GrazingDate from '../../components/Grazing/GrazingDate';
import Name from '../../components/Grazing/Name';
import GrazingSideBar from '../../components/Grazing/GrazingSideBar';
import image1 from '../../assets/rake.png'; 
import image2 from '../../assets/tool1.jpg'; 
import image3 from '../../assets/boots.jpg'; 
import image4 from '../../assets/tool.jpg'; 
import image5 from '../../assets/glows.jpeg'; 
import image6 from '../../assets/compost1.jpg'; 
import image7 from '../../assets/pesticide.jpg'; 
import image8 from '../../assets/seed.jpg'; 

function OrderStock() {
  return (
    <div>
      <Box className="dashboard-content">
        <Box className="welcome-header">
            <Name/>
            <GrazingDate/>
        </Box>
        <Typography
          sx={{
            fontFamily: 'Poppins',
            margin: '16px 0'
          }}
        > Order stocks for the maintenance of relevant pastures</Typography>
        
        <Container>
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Grid key={item} item xs={6} sm={3}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item === 1 ? image1 : item === 2 ? image2 : item === 3 ? image3 : item === 4 ? image4 : item === 5 ? image5 : item === 6 ? image6 : item === 7 ? image7 : image8}
                    alt={`Image ${item}`}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" sx={{fontFamily: 'Poppins'}}>
                      ITEM {item}
                    </Typography>
                    <ReduceStockForm />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

      </Box>

      <GrazingSideBar sx={{ position: 'fixed', left: 0, top: 0, height: '100vh' }} />
    </div>
  );
}

export default OrderStock;
