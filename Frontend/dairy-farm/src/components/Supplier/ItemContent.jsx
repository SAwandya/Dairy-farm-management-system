import { Box } from '@mui/material';
import React from 'react';
import Welcome from './Welcome'
import ItemTable from './ItemTable';
import '../../styles/supply.css'
import ItemStatistics from './ItemStatistics';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});


function ItemContent() {
    return (

        <ThemeProvider theme={theme}>
            <Box className="dashboard-content-supply">
                <Welcome/>

                <Box className="dashboard-content-supply">
                    <ItemStatistics/>

                </Box>
                
                <Box className="dashboard-content-supply">
                    <ItemTable/>

                </Box>
            </Box>
        </ThemeProvider>
    );
  }
  
  export default ItemContent;