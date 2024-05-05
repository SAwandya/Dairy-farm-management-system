import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import StatsCard from '../../components/Milking/StatsCard';
import axios from 'axios';
import GrassIcon from '@mui/icons-material/Grass';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import RecyclingIcon from '@mui/icons-material/Recycling';

//stat cards
function GrazingStat() {
    const [totalSessions, setTotalSessions] = useState(0);
   
    const [totalWastageCollected, setTotalWastageCollected] = useState(0);
    const [amountOfPastures, setAmountOfPastures] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            //  total sessions
            const sessionsResponse = await axios.get('http://localhost:3000/api/sessions');
            const sessions = sessionsResponse.data.length;
            setTotalSessions(sessions);

            

            //  total wastage
            const wastageResponse = await axios.get('http://localhost:3000/api/effluentRoutes');
            const wastage = wastageResponse.data.reduce((acc, route) => acc + route.wastageAmount, 0);
            setTotalWastageCollected(wastage);

            // amount of pastures
            const pasturesResponse = await axios.get('http://localhost:3000/api/pastureDetails');
            const pastures = pasturesResponse.data.length;
            setAmountOfPastures(pastures);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Box>
            <Typography
                variant="h3"
                className='main-stats-title'
                sx={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginTop: '20px'
                }}
            >
                Today's Main Statistics
            </Typography>

            <Box className="stat-cards-container">
                <StatsCard
                    title='Total Sessions'
                    value={totalSessions.toString()}
                    icon='../../../src/assets/icon1.png'
                />
                <StatsCard
                    title='Water Usage'    //check this
                    value={'70 litres'}
                    icon={<WaterDropIcon/>}
                />
                <StatsCard
                    title='Total Wastage Collected'
                    value={`${totalWastageCollected} Kg`}
                    icon={<RecyclingIcon />}
                />
                <StatsCard
                    title='Amount of Pastures'
                    value={amountOfPastures.toString()}
                    icon={<GrassIcon />}
                />
            </Box>
        </Box>
    );
}

export default GrazingStat;
