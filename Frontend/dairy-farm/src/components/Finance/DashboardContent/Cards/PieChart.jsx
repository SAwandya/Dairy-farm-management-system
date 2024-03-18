import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import '../../../../styles/Finance/MainDashboard/PieChart.css'

const data = [
  { name: 'Used', value: 800 },
  { name: 'Remaining', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F'];

function PieChart() {
  return (
    <Card className="pie-chart-container">
      <CardContent>
        <Typography variant="h5" component="h2">
          Budget Usage
        </Typography>
        <div style={{ width: '100%', height: 300 }}>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </CardContent>
    </Card>
  );
}

export default PieChart;
