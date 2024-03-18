import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../../../styles/Finance/MainDashboard/graph.css'

const data = [
  { date: '2022-01-01', income: 1500, expenses: 1000 },
  { date: '2022-01-02', income: 1800, expenses: 1200 },
  { date: '2022-01-03', income: 2000, expenses: 1300 },
  { date: '2022-01-04', income: 2200, expenses: 1400 },
  { date: '2022-01-05', income: 2300, expenses: 1500 },
  { date: '2022-01-06', income: 2500, expenses: 1600 },
  { date: '2022-01-07', income: 2600, expenses: 1700 },
];

function Graph() {
  return (
    <Card className="graph-container">
      <CardContent>
        <Typography variant="h5" component="h2">
          Monthly Expenses and Incomes
        </Typography>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#8884d8" />
              <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default Graph;
