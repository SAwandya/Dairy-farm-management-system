import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const InventoryChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/inventory');
      if (!response.ok) {
        console.error('Failed to fetch inventory data');
        return;
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        console.error('Inventory data is not an array');
        return;
      }

      const aggregatedData = data.reduce((acc, item) => {
        if (acc[item.itemName]) {
          acc[item.itemName] += item.quantity;
        } else {
          acc[item.itemName] = item.quantity;
        }
        return acc;
      }, {});

      const itemNames = Object.keys(aggregatedData);
      const quantities = Object.values(aggregatedData);
      setChartData({
        labels: itemNames,
        datasets: [
          {
            label: 'Inventory',
            data: quantities,
            backgroundColor: 'rgba(75,192,192,0.6)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75,192,192,0.4)',
            hoverBorderColor: 'rgba(75,192,192,1)',
          },
        ],
      });
    };
    fetchData();
  }, []);
  return (
    <div>
      <h2>Inventory</h2>
      <Bar data={chartData} options={{
        scales: {
          y: {
            title: {
              display: true,
              text: 'Quantity'
            }
          }
        }
      }} />
    </div>
  );
};

export default InventoryChart;