import * as React from 'react';
import { BarChart } from '@mui/x-charts';
import '../../styles/milking.css'

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  'Mar 13',
  'Mar 14',
  'Mar 15',
  'Mar 16',
  'Mar 17',
  'Mar 18',
  'Mar 19',
];

export default function StatGraph() {
  return (
    <BarChart
      className='barchart'
      width={750}
      height={355}
      series={[{ data: uData, label: 'Milk Collected', type: 'bar'}]}
      xAxis={[{ scaleType: 'band', data: xLabels }]}
      sx={{
        backgroundColor: '#252B48',
        borderRadius: '20px',
        paddingLeft: '16px',
        marginTop: '26px'
      }}
      colors={['#fff']}
      
    >
    </BarChart>
  );
}
