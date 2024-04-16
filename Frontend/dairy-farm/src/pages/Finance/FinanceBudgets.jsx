import React from "react";
import Container from "@mui/material/Container";
import Financesidebar from "../../components/Finance/Financesidebar";
import BudgetTable from "../../components/Finance/Budgets/BudgetTable";
import BudgetDash from "../../components/Finance/Budgets/BudgetsDash";

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
            <div style={{ flex: 1 }}>
      <BudgetDash/>
      <BudgetTable/>
      </div>
    </Container>
  );
}

export default FinanceBudgets;
