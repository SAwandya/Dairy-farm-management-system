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
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
                // Add more colors if you have more suppliers
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