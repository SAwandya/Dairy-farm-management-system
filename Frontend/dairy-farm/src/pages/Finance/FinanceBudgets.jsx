import React from "react";
import Container from "@mui/material/Container";
import Financesidebar from "../../components/Finance/Financesidebar";
import BudgetTable from "../../components/Finance/Budgets/BudgetTable";

function FinanceBudgets() {
  return (
    <Container
      className="main-container"
      sx={{
        display: "flex",
        minWidth: "1036px",
      }}
    >
      <Financesidebar />
      <BudgetTable/>
    </Container>
  );
}

export default FinanceBudgets;
