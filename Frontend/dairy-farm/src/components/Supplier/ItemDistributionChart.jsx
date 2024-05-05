import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const ItemDistributionChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/item");
        const items = response.data;
        const itemCounts = items.reduce((acc, item) => {
          acc[item.itemName] = (acc[item.itemName] || 0) + 1;
          return acc;
        }, {});

        setChartData({
        labels: Object.keys(itemCounts),
        datasets: [
            {
            data: Object.values(itemCounts),
            backgroundColor: [
                '#FFCA28', // Slightly darker Amber
                '#66BB6A', // Slightly darker Green
                '#BDBDBD', // Slightly darker Grey
                '#E57373', // Slightly darker Red
                '#42A5F5', // Light Blue
                '#AB47BC', // Purple
                '#FF7043', // Deep Orange
                '#26A69A', // Teal
                // Add more contrasting colors if you have more items
            ]
            }
        ]
        });
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default ItemDistributionChart;