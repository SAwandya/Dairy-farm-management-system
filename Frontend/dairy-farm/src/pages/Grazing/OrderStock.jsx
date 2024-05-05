import React from 'react';
import ReduceStockForm from '../../components/Supplier/ReduceStockForm';
import { Container, Box, Button, Typography ,Card} from '@mui/material';
import GrazingDate from '../../components/Grazing/GrazingDate';
import Name from '../../components/Grazing/Name';
import GrazingSideBar from '../../components/Grazing/GrazingSideBar';


function OrderStock() {
  return (
    
        <div>
            <Box className="dashboard-content">
                <div align='center'></div>
                <GrazingDate/>
                <Name/>
              
              <Typography> order stocks for the maintainence of relevant pastures</Typography>

              <Container
            className="main-container"
            sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            }}
        >
            <Card>
            
           <ReduceStockForm />
            </Card>
          
        </Container>
              
      </Box>
            
        <GrazingSideBar sx={{ position: 'fixed', left: 0, top: 0, height: '100vh' }} />
        
      
    </div>
  );
}

export default OrderStock;
