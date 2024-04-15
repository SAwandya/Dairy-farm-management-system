import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import StatsCard from './StatsCard';
import axios from 'axios';

function MainStatistics() {
    const [totalSessions, setTotalSessions] = useState(0);
    const [completedSessions, setCompletedSessions] = useState(0);
    const [totalMilkCollected, setTotalMilkCollected] = useState(0);
    const [amountOfTanks, setAmountOfTanks] = useState(0);

    useEffect(() => {
        fetchTotalSessions();
        fetchCompletedSessions();
        fetchTotalMilkCollected();
        fetchAmountOfTanks();
    }, []);

    const fetchTotalSessions = async () => {
        try {
            const today = new Date().toLocaleDateString();
            const response = await axios.get('http://localhost:3000/api/milkingSessions');
            const sessions = response.data.data.filter(session => new Date(session.date).toLocaleDateString() === today).length;
            setTotalSessions(sessions);
        } catch (error) {
            console.error('Error fetching total sessions:', error);
        }
    };
    

    const fetchCompletedSessions = async () => {
        try {
            const today = new Date().toLocaleDateString();
            const response = await axios.get('http://localhost:3000/api/milkingSessions');
            const sessions = response.data.data.filter(session => session.status === 'Completed' && new Date(session.date).toLocaleDateString() === today).length;
            setCompletedSessions(sessions);
        } catch (error) {
            console.error('Error fetching completed sessions:', error);
        }
    };
    

    const fetchTotalMilkCollected = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/milkingData');
            const milkData = response.data.data;
            const today = new Date().toLocaleDateString();
            const milkCollectedToday = milkData.reduce((acc, data) => {
                if (new Date(data.createdAt).toLocaleDateString() === today) {
                    return acc + data.amountOfMilk;
                }
                return acc;
            }, 0);
            setTotalMilkCollected(milkCollectedToday);
        } catch (error) {
            console.error('Error fetching total milk collected:', error);
        }
    };

    const fetchAmountOfTanks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/milkingStorage');
            const tanks = response.data.data.length;
            setAmountOfTanks(tanks);
        } catch (error) {
            console.error('Error fetching amount of tanks:', error);
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
                    title='Completed Sessions'
                    value={completedSessions.toString()}
                    icon='../../../src/assets/icon1.png'
                />
                <StatsCard
                    title='Total Milk Collected'
                    value={`${totalMilkCollected}L`}
                    icon='../../../src/assets/icon2.png'
                />
                <StatsCard
                    title='Amount of Tanks'
                    value={amountOfTanks.toString()}
                    icon='../../../src/assets/icon3.png'
                />
            </Box>
        </Box>
    );
}

export default MainStatistics;
