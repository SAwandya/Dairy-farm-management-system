import { Box } from '@mui/material';
import React from 'react';
import Welcome from './Welcome'
import OrderStatistics from './OrderStatistics';
import OrderTable from './ordertable';
import '../../styles/supply.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

function OrderContent() {
    return (
        <ThemeProvider theme={theme}>
        <Box className="dashboard-content-supply">
            <Welcome/>
                <Box className="dashboard-content-supply">
                    <OrderStatistics/>
                </Box>
                <Box className="dashboard-content-supply">
                    <OrderTable/>

                </Box>
        </Box>
        </ThemeProvider>
    );
  }
  
  export default OrderContent;