import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import StatsCard from './StatsCard';
import axios from 'axios';


function MainStatistics() {

    const [totalOrdersCount, setTotalOrdersCount] = useState(0);
    const [receivedOrdersCount, setReceivedOrdersCount] = useState(0);
    const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  
    useEffect(() => {
      const fetchOrders = async () => {
        const response = await axios.get('http://localhost:3000/api/order');
        setTotalOrdersCount(response.data.length);
        const receivedOrders = response.data.filter(order => order.orderStatus === 'Received');
        setReceivedOrdersCount(receivedOrders.length);
        const pendingOrders = response.data.filter(order => order.orderStatus === 'Pending');
        setPendingOrdersCount(pendingOrders.length);
      };
      fetchOrders();
    }, []);
    return (
        <Box>
            <Typography
                variant="h3"
                className='main-stats-title'
                sx={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginTop: '20px',
                }}
            >Order Overview</Typography>

            <Box className="stat-cards-container">
                <StatsCard
                    title='Total'
                    value={totalOrdersCount}
                    icon='../../../src/assets/icon1.png'

                />
                <StatsCard
                    title='Received'
                    value={receivedOrdersCount}
                    icon='../../../src/assets/icon1.png'
                />
                <StatsCard
                    title='Pending'
                    value={pendingOrdersCount}
                    icon='../../../src/assets/icon2.png'
                />
            </Box>
        </Box>
    );
}

export default MainStatistics;