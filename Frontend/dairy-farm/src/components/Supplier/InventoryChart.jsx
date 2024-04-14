import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

function InventoryChart() {
  const [chartData, setChartData] = useState({});

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

    const itemNames = data.map(item => item.itemName);
    const quantities = data.map(item => item.quantity);

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
        }
      ]
    });
  };

  fetchData();
}, []);

  return (
    <div>
      <h2>Inventory</h2>
      <Bar data={chartData} />
    </div>
  );
}

export default InventoryChart;