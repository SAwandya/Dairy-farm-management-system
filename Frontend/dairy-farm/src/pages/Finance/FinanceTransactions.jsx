import React from "react";
import Container from "@mui/material/Container";
import Financesidebar from "../../components/Finance/Financesidebar";
import TransactionsTable from "../../components/Finance/Transactions/TransactionsTable";
import TransactionsDashboard from "../../components/Finance/Transactions/TransactionsDashboard";
import Typography from '@mui/material/Typography';

function FinanceTransactions() {
  return (
    <Container
      className="main-container"
      sx={{
        display: "flex",
        minWidth: "1036px",
      }}
    >
      <Financesidebar />
      <div style={{ flex: 1 }}>
        <TransactionsDashboard/>
        <Typography variant="h4" sx={{ textAlign: 'center' ,  fontFamily: 'Poppins', fontWeight: 'bold'}}>Financial Transactions</Typography>
        <TransactionsTable />
      </div>
    </Container>
  );
}

export default FinanceTransactions;
