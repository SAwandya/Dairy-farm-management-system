import React from "react";
import Container from "@mui/material/Container";
import Financesidebar from "../../components/Finance/Financesidebar";
import TransactionsTable from "../../components/Finance/Transactions/TransactionsTable";

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
      <TransactionsTable />
    </Container>
  );
}

export default FinanceTransactions;
