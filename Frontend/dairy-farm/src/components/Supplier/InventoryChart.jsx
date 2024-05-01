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
      const response = await fetch('http://localhost:3000/api/order');
      if (!response.ok) {
        console.error('Failed to fetch order data');
        return;
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        console.error('Order data is not an array');
        return;
      }
      
      const filteredData = data.filter(order => order.quantity > 10);
      const groupedData = filteredData.reduce((acc, order) => {
        const itemName = order.orderType;
        acc[itemName] = (acc[itemName] || 0) + order.quantity;
        return acc;
      }, {});
      const itemNames = Object.keys(groupedData);
      const quantities = Object.values(groupedData);
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
          // x: {
          //   title: {
          //     display: true,
          //     text: 'Item Name'
          //   }
          // },
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