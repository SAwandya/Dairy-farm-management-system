import * as React from 'react';
import { BarChart } from '@mui/x-charts';
import axios from 'axios';
import { useEffect, useState } from 'react';

const MilkingBarChart = ({ selectedTimePeriod }) => {
  const [uData, setUData] = useState([0]);
  const [xLabels, setXLabels] = useState(['q']);

  useEffect(() => {
    fetchData('last7days');
  }, [selectedTimePeriod]);

  const fetchData = async (timePeriod) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/milkingData/${timePeriod}`);
      const milkingData = response.data;
      const dataPerPeriod = calculateDataPerPeriod(milkingData, timePeriod);
      const labels = generateXLabels(timePeriod);
      setUData(dataPerPeriod);
      setXLabels(labels);
    } catch (error) {
      console.error('Error fetching milking data:', error);
    }
  };

  const calculateDataPerPeriod = (milkingData) => {
    let dataPerPeriod = [];
    dataPerPeriod = calculateSumPerDay(milkingData, 7);
    return dataPerPeriod;
  };

  const calculateSumPerDay = (milkingData, days) => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (days - 1));

    const result = [];
    if (Array.isArray(milkingData.data)) {
        for (let i = 0; i < days; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            const sum = milkingData.data.reduce((acc, curr) => {
                const currDate = new Date(curr.createdAt);
                if (currDate.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)) {
                    return acc + curr.amountOfMilk;
                }
                return acc;
            }, 0);
            result.push(sum);
        }
    } else {
        for (let i = 0; i < days; i++) {
            result.push(0);
        }
    }
    return result;
};

  const generateXLabels = () => {
    let labels = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - i));
      labels.push(`${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}`);
    }

    return labels;
  };

  const getISOWeek = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const daysOffset = firstDayOfYear.getDay() - 1;
    const firstMondayOfYear = new Date(firstDayOfYear.getFullYear(), 0, (1 + (daysOffset > 0 ? 7 - daysOffset : daysOffset)));
    const diff = date - firstMondayOfYear;
    return Math.ceil((diff / 86400000 + 1) / 7);
  };

  return (
    <BarChart
      className='barchart'
      width={740}
      height={370}
      series={[{ data: uData, label: 'Milk Collected', type: 'bar' }]}
      xAxis={[{ scaleType: 'band', data: xLabels }]}
      sx={{
        backgroundColor: '#252B48',
        borderRadius: '20px',
        paddingLeft: '16px',
        marginTop: '26px',
        "& .MuiChartsLegend-series": {
          stroke: "#fff",
        },
      }}
      colors={['#fff']}
    />
  );
};

export default MilkingBarChart;
