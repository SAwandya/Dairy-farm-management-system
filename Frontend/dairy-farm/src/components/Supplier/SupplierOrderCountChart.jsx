import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const SupplierOrderCountChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/order");
        const orders = response.data;
        const supplierOrderCounts = orders.reduce((acc, order) => {
          acc[order.supplierName] = (acc[order.supplierName] || 0) + 1;
          return acc;
        }, {});

        setChartData({
        labels: Object.keys(supplierOrderCounts),
        datasets: [
            {
            data: Object.values(supplierOrderCounts),
            backgroundColor: [
                '#FFCA28', // Slightly darker Amber
                '#66BB6A', // Slightly darker Green
                '#BDBDBD', // Slightly darker Grey
                '#E57373', // Slightly darker Red
                '#42A5F5', // Light Blue
                // Add more contrasting colors if you have more suppliers
            ]
            }
        ]
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default SupplierOrderCountChart;