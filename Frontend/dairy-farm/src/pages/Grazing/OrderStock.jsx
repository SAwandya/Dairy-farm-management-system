import React from 'react';
import ReduceStockForm from '../../components/Supplier/ReduceStockForm';

function OrderStock() {
  return (
    
        <div>
            <Box className="dashboard-content">
                <div align='center'></div>
                <GrazingDate/>
                <Name/>
              
              <Typography> Information regarding the  waste management is recorded here</Typography>
              
      </Box>
            
        <GrazingSideBar sx={{ position: 'fixed', left: 0, top: 0, height: '100vh' }} />
        <Container
            className="main-container"
            sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            }}
        ></Container>
      <h1>Order Stock</h1>
      <ReduceStockForm />
    </div>
  );
}

export default OrderStock;
