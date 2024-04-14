import * as React from 'react';
import { PieChart } from '@mui/x-charts';

const qualityData = [
  { day: 'Monday', qualityCheckData: 'Pass' },
  { day: 'Tuesday', qualityCheckData: 'Pass' },
  { day: 'Wednesday', qualityCheckData: 'Fail' },
  { day: 'Thursday', qualityCheckData: 'Pass' },
  { day: 'Friday', qualityCheckData: 'Pass' },
  { day: 'Saturday', qualityCheckData: 'Fail' },
  { day: 'Sunday', qualityCheckData: 'Pass' },
];

function MilkingPieChart() {
  const passCount = qualityData.filter(item => item.qualityCheckData === 'Pass').length;
  const failCount = qualityData.filter(item => item.qualityCheckData === 'Fail').length;

  return (
    <PieChart
      width={400}
      height={400}
      series={[
        {
          data: [
            { category: 'Pass', value: passCount, label: 'Pass', color: '#1fd655' },
            { category: 'Fail', value: failCount, label: 'Fail', color: '#F3797E' }
          ],
          innerRadius: 50,
          outerRadius: 140,
          paddingAngle: 2,
          cornerRadius: 5,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          cx: 150,
          cy: 190,
        }
      ]}
    />
  );
}

export default MilkingPieChart;
