import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import '../../../../styles/Finance/MainDashboard/PieChart.css'
import axios from "axios"; 

const COLORS = ['#0088FE', '#00C49F'];

function MyPieChart() {

    const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/transaction");
        const expenseTransactions = response.data.filter(transaction => transaction.type === "Expense");
        const incomeTransactions = response.data.filter(transaction => transaction.type === "Income");

        const totalExpenseValue = expenseTransactions.reduce((acc, transaction) => acc + parseFloat(transaction.value), 0);
        const totalIncomeValue = incomeTransactions.reduce((acc, transaction) => acc + parseFloat(transaction.value), 0);

        setTotalExpense(totalExpenseValue);
        setTotalIncome(totalIncomeValue);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, []);

  const remainingValue = totalIncome - totalExpense;

    const data = [
    { name: 'Used', value: totalExpense },
    { name: 'Remaining', value: remainingValue },
  ];

  return (
    <Card style={{width: '100%'}}>
      <CardContent >
        <Typography variant="h5" component="h2" sx={{ fontFamily: 'Poppins', fontWeight: 500}} >
          Budget Usage
        </Typography>
        <div style={{ width: '100%', height: 400 }}>
          <PieChart width={550} height={400} margin={{ right: 0 }}> 
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={140}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36}/> 
          </PieChart>
        </div>
      </CardContent>
    </Card>
  );
}

export default MyPieChart;
