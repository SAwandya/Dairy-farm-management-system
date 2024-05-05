import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const OrderStatusDistributionChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/order");
        const orders = response.data;

        if (orders) { // Check if orders is defined
          const statusCounts = orders.reduce((acc, order) => {
            acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
            return acc;
          }, {});

         setChartData({
  labels: Object.keys(statusCounts),
  datasets: [
    {
      data: Object.values(statusCounts),
      backgroundColor: [
        '#FFCA28', // Slightly darker Amber for pending
        '#66BB6A', // Slightly darker Green for received
        '#BDBDBD', // Slightly darker Grey for other statuses
        '#E57373'  // Slightly darker Red for cancelled
        // Add more contrasting colors if you have more order statuses
      ]
    }
  ]
});
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Pie data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default OrderStatusDistributionChart;