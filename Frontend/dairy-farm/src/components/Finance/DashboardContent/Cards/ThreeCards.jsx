import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import '../../../../styles/Finance/MainDashboard/ThreeCards.css'
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios here


//comment

function ThreeCards() {
    const [totalExpense, setTotalExpense] = useState(0);
      const [totalIncome, setTotalIncome] = useState(0);
      const profitMarginPercentage = totalIncome !== 0 ? 100 - (totalExpense / totalIncome) * 100 : 0;



useEffect(() => {
  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/transaction");
      const expenseTransactions = response.data.filter(transaction => transaction.type === "Expense");
      console.log("Expense Transactions:", expenseTransactions); // Check expense transactions
      const totalExpenseValue = expenseTransactions.reduce((acc, transaction) => acc + parseFloat(transaction.value), 0);
      console.log("Total Expense Value:", totalExpenseValue); // Check total expense value
      setTotalExpense(totalExpenseValue);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  fetchTransactions();
}, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/transaction");
        const incomeTransactions = response.data.filter(transaction => transaction.type === "Income");
        const totalIncomeValue = incomeTransactions.reduce((acc, transaction) => acc + parseFloat(transaction.value), 0);
        setTotalIncome(totalIncomeValue);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

    useEffect(() => {
    const fetchTransactions = async () => {
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

    fetchTransactions();
  }, []);


  return (
    <Grid container spacing={15} justifyContent="space-between">
      <Grid item xs={12} sm={4}>
        <Card className="card-container" sx={{ minWidth: 275, borderRadius: 5, marginLeft: 0, backgroundColor: '#00ff1a2b', maxHeight: '150px', position: 'relative' }}>
          <CardContent>
            <Typography variant="h5" component="h2" sx={{ fontSize: 22, fontFamily: 'Poppins', fontWeight: 500  }} color="#000000" gutterBottom>
              Monthly Spendings
            </Typography>
            <Typography variant="body2" component="p" sx={{ fontSize: 16, fontFamily: 'Poppins', fontWeight: 500 }} color="#000000" gutterBottom>
              LKR.{totalExpense.toFixed(2)}
            </Typography>
          </CardContent>
          <CardActions style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
        <Button borderRadius='5px' sx={{ backgroundColor: '#FBFFEC', color: 'black', fontFamily: 'poppins', borderRadius: 5, fontSize: '10px', '&:hover': { backgroundColor: '#ffffff' } }}>
          <Link to="/financereport" style={{ textDecoration: 'none', color: 'inherit' , fontFamily: 'Poppins'}}>View</Link></Button>
      </CardActions>
        </Card>

      </Grid>
      <Grid item xs={12} sm={4}>
        <Card className="card-container" sx={{ minWidth: 275, borderRadius: 5, marginLeft: 0, backgroundColor: '#00ff1a2b', maxHeight: '150px', position: 'relative' }}>
          <CardContent>
            <Typography variant="h5" component="h2" sx={{ fontSize: 22, fontFamily: 'Poppins', fontWeight: 500 }} color="#000000" gutterBottom>
              Cash Flow
            </Typography>
            <Typography variant="body2" component="p" sx={{ fontSize: 16, fontFamily: 'Poppins', fontWeight: 500 }} color="#000000" gutterBottom>
              LKR.{totalIncome.toFixed(2)}
            </Typography>
          </CardContent>
        <CardActions style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
        <Button borderRadius='5px' sx={{ backgroundColor: '#FBFFEC', color: 'black', fontFamily: 'poppins', borderRadius: 5, fontSize: '10px' , '&:hover': { backgroundColor: '#ffffff' }}}>
          <Link to="/financetrans" style={{ textDecoration: 'none', color: 'inherit' , fontFamily: 'Poppins'}}>View</Link></Button>
      </CardActions>
        </Card>

      </Grid>
      <Grid item xs={12} sm={4}>
        <Card className="card-container" sx={{ minWidth: 275, borderRadius: 5, marginLeft: 0, backgroundColor: '#00ff1a2b', maxHeight: '150px', position: 'relative' }}>
          <CardContent>
            <Typography variant="h5" component="h2" sx={{ fontSize: 22, fontFamily: 'Poppins', fontWeight: 500 }} color="#000000" gutterBottom>
              Profit Margin Percentage
            </Typography>
            <Typography variant="body2" component="p" sx={{ fontSize: 16, fontFamily: 'Poppins', fontWeight: 500 }} color="#000000" gutterBottom>
              {profitMarginPercentage.toFixed(2)}%
            </Typography>
          </CardContent>
          <CardActions style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
        <Button borderRadius='5px' sx={{ backgroundColor: '#FBFFEC', color: 'black', fontFamily: 'poppins', borderRadius: 5, fontSize: '10px' , '&:hover': { backgroundColor: '#ffffff' }}}>
          <Link to="/financebud" style={{ textDecoration: 'none', color: 'inherit', fontFamily: 'Poppins' }}>View</Link></Button>
      </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ThreeCards;
