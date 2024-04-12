import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts';
import axios from 'axios';

const xLabels = [
  'livestock manure',
  'other',
  'discarded production',
  'weeds',
];

export default function StatGraph() {
  const [wasteTypeCounts, setWasteTypeCounts] = useState({
    livestockManure: 0,
    other: 0,
    discardedProduction: 0,
    weeds: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/effluentRoutes/count-waste-types');
        setWasteTypeCounts(response.data);
      } catch (error) {
        console.error("Error fetching waste type counts:", error);
      }
    };

    fetchData();
  }, []);

  const data = [
    { name: 'livestock manure', value: wasteTypeCounts.livestockManure, color: '#a8bdb7' },
    { name: 'other', value: wasteTypeCounts.other, color: '#33FFC4' },
    { name: 'discarded production', value: wasteTypeCounts.discardedProduction, color: '#3373FF' },
    { name: 'weeds', value: wasteTypeCounts.weeds, color: '#7A33FF' },
  ];

  return (
    <BarChart
      className='barchart'
      width={520}
      height={355}
      series={[{ data: data.map(item => item.value), label: 'Types of Waste Collected', type: 'bar'}]}
      xAxis={[{ scaleType: 'band', data: xLabels }]}
      sx={{
        backgroundColor: '#1a6952',
        borderRadius: '20px',
        paddingLeft: '1px',
        marginTop: '26px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      colors={data.map(item => item.color)}
    >
    </BarChart>
  );
}
