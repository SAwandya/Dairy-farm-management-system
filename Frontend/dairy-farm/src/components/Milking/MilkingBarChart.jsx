import * as React from 'react';
import { BarChart } from '@mui/x-charts';
import axios from 'axios';
import { useEffect, useState } from 'react';

const MilkingBarChart = ({ selectedTimePeriod }) => {
  const [uData, setUData] = useState([0]);
  const [xLabels, setXLabels] = useState(['q']);

  useEffect(() => {
    fetchData(selectedTimePeriod);
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

  const calculateDataPerPeriod = (milkingData, timePeriod) => {
    let dataPerPeriod = [];
    if (timePeriod === 'last7days') {
      dataPerPeriod = calculateSumPerDay(milkingData, 7);
    } else if (timePeriod === 'lastMonth') {
      dataPerPeriod = calculateSumPerWeek(milkingData, 4);
    } else if (timePeriod === 'last6months') {
      dataPerPeriod = calculateSumPerMonth(milkingData, 6);
    } else {
      dataPerPeriod = [1, 2, 3];
    }
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



const calculateSumPerWeek = (milkingData, weeks) => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - (weeks * 7 - 1));

  const result = [];
  for (let i = 0; i < weeks; i++) {
      const weekStart = new Date(startDate);
      weekStart.setDate(startDate.getDate() + (i * 7));
      const weekEnd = new Date(startDate);
      weekEnd.setDate(startDate.getDate() + ((i + 1) * 7) - 1);

      const sum = milkingData.data.reduce((acc, curr) => {
          const currDate = new Date(curr.createdAt);
          if (currDate >= weekStart && currDate <= weekEnd) {
              return acc + curr.amountOfMilk;
          }
          return acc;
      }, 0);
      result.push(sum);
  }
  return result;
};

const calculateSumPerMonth = (milkingData, months) => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setMonth(today.getMonth() - (months - 1));

  const result = [];
  for (let i = 0; i < months; i++) {
    const monthStart = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
    const monthEnd = new Date(startDate.getFullYear(), startDate.getMonth() + i + 1, 0);

    const sum = milkingData.data.reduce((acc, curr) => {
      const currDate = new Date(curr.createdAt);
      if (currDate >= monthStart && currDate <= monthEnd) {
        return acc + curr.amountOfMilk;
      }
      return acc;
    }, 0);
    result.push(sum);
  }
  return result;
};


  const generateXLabels = (timePeriod) => {
    let labels = [];
    if (timePeriod === 'last7days') {
      const today = new Date();
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - (6 - i));
        labels.push(`${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}`);
      }
    } else if (timePeriod === 'lastMonth') {
      const today = new Date();
      const lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);
      const weeksInMonth = getWeeksInMonth(lastMonth.getFullYear(), lastMonth.getMonth());
      for (let i = 0; i < weeksInMonth; i++) {
        labels.push(`Week ${i + 1}`);
      }
    } else if (timePeriod === 'last6months') {
      const today = new Date();
      for (let i = 0; i < 6; i++) {
        const date = new Date(today);
        date.setMonth(today.getMonth() - (5 - i));
        labels.push(date.toLocaleString('en-US', { month: 'long' }));
      }
    }
    return labels;
  };

  const getWeeksInMonth = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWeek = getISOWeek(firstDay);
    const endWeek = getISOWeek(lastDay);
    return endWeek - startWeek + 1;
  };

  const getISOWeek = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const daysOffset = firstDayOfYear.getDay() - 1; // Monday is first day of the week
    const firstMondayOfYear = new Date(firstDayOfYear.getFullYear(), 0, (1 + (daysOffset > 0 ? 7 - daysOffset : daysOffset)));
    const diff = date - firstMondayOfYear;
    return Math.ceil((diff / 86400000 + 1) / 7);
  };

  return (
    <BarChart
      className='barchart'
      width={740}
      height={400}
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
