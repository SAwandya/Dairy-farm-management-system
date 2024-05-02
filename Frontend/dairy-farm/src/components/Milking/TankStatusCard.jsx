import React, { useState, useEffect } from "react";
import { Box, Typography } from '@mui/material';
import SmallTank from './SmallTank';
import axios from 'axios';

function TankStatusCard() {
    const [storageTanks, setStorageTanks] = useState([]);

    useEffect(() => {
        fetchStorageTanks();
    }, []);

    const fetchStorageTanks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/milkingStorage'); // Update the API endpoint
            if (response.data.success) {
                setStorageTanks(response.data.data);
            } else {
                console.error('Failed to fetch storage tanks:', response.data.error);
            }
        } catch (error) {
            console.error('Error fetching storage tanks:', error);
        }
    };

    return (
        <Box className="chart-card-container">
            <Typography
                variant="h3"
                className='tank-card-title'
                sx={{
                    fontSize: '18px',
                    fontWeight: '600',
                }}
            >Tank Status</Typography>
            {storageTanks.map(tank => (
                <SmallTank
                    key={tank.tankId}
                    tankID={`Tank #${tank.tankId}`}
                    levelPercentage={(tank.availableMilk / tank.capacity) * 100}
                />
            ))}
        </Box>
    );
}

export default TankStatusCard;
