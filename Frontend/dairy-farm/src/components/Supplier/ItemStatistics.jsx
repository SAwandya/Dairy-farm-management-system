import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import StatsCard from './StatsCard';
import axios from 'axios';

function ItemStatistics() {
  const [highPriorityCount, setHighPriorityCount] = useState(0);
  const [mediumPriorityCount, setMediumPriorityCount] = useState(0);
  const [lowPriorityCount, setLowPriorityCount] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('http://localhost:3000/api/item');
      const highPriorityItems = response.data.filter(item => item.itemPriority === 'High');
      setHighPriorityCount(highPriorityItems.length);
      const mediumPriorityItems = response.data.filter(item => item.itemPriority === 'Medium');
      setMediumPriorityCount(mediumPriorityItems.length);
      const lowPriorityItems = response.data.filter(item => item.itemPriority === 'Low');
      setLowPriorityCount(lowPriorityItems.length);
    };
    fetchItems();
  }, []);

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
      >Item Overview</Typography>

      <Box className="stat-cards-container">
        <StatsCard
          title='High Priority'
          value={highPriorityCount}
          icon='../../../src/assets/icon1.png'
        />
        <StatsCard
          title='Medium Priority'
          value={mediumPriorityCount}
          icon='../../../src/assets/icon1.png'
        />
        <StatsCard
          title='Low Priority'
          value={lowPriorityCount}
          icon='../../../src/assets/icon2.png'
        />
      </Box>
    </Box>
  );
}

export default ItemStatistics;