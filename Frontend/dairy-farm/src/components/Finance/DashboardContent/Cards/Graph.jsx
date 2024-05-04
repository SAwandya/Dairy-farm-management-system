import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import '../../../../styles/Finance/MainDashboard/graph.css'

function Graph() {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/transaction');
        const transactions = response.data;

        // Process transactions data to calculate total income and expenses per day
        const groupedData = transactions.reduce((acc, transaction) => {
          const date = transaction.date.split('T')[0]; // Extracting date from ISO format
          if (!acc[date]) {
            acc[date] = { date, income: 0, expenses: 0 };
          }
          if (transaction.type === 'Income') {
            acc[date].income += transaction.value;
          } else {
            acc[date].expenses += transaction.value;
          }
          return acc;
        }, {});

        // Convert groupedData object into array for recharts
        const formattedData = Object.values(groupedData);

        setGraphData(formattedData);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="graph-contain" style={{height: '100%'}}>
      <CardContent style={{marginTop: '1%'}}>
        <Typography variant="h5" component="h2">
          Monthly Expenses and Incomes
        </Typography>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart
              data={graphData}
              margin={{ top: 35, right: 40, left: 20}}
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
