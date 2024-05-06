import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts';
import axios from 'axios';

function MilkingPieChart({ selectedTimePeriod }) {
  const [qualityData, setQualityData] = useState([]);

  useEffect(() => {
    fetchData(selectedTimePeriod);
  }, [selectedTimePeriod]);

  const fetchData = async (timePeriod) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/milkingData/${timePeriod}`);
      const milkingData = response.data.data;
      setQualityData(milkingData);
    } catch (error) {
      console.error('Error fetching milking data:', error);
    }
  };

  const passCount = qualityData.filter(item => item.qualityCheckResult === 'Pass').length;
  const failCount = qualityData.filter(item => item.qualityCheckResult === 'Fail').length;

  return (
    <PieChart
      width={400}
      height={400}
      series={[
        {
          data: [
            { category: 'Pass', value: passCount, label: 'Pass', color: '#1fd655' },
            { category: 'Fail', value: failCount, label: 'Fail', color: '#F3797E' }
          ],
          innerRadius: 50,
          outerRadius: 140,
          paddingAngle: 2,
          cornerRadius: 5,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          cx: 150,
          cy: 190,
        }
      ]}
    />
  );
}

export default MilkingPieChart;
