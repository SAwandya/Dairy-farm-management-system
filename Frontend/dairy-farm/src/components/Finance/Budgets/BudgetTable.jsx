import React from "react";
import { Container, Typography, Paper, Grid, LinearProgress, Button, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

const departments = [
  "Veterinary",
  "Milking",
  "Grazing",
  "Production",
  "HR",
  "CRM",
  "Sales",
  "Finance",
  "Miscellaneous"
];

// Sample data for demonstration
const departmentBudgets = {
  Veterinary: { budget: 10000, used: 8000 },
  Milking: { budget: 20000, used: 12000 },
  Grazing: { budget: 15000, used: 10000 },
  Production: { budget: 90000, used: 89000 },
  HR: { budget: 125000, used: 90000 },
  CRM: { budget: 60000, used: 45000 },
  Sales: { budget: 35000, used: 2000 },
  Finance: { budget: 40000, used: 22000 },
  Miscellaneous: { budget: 20000, used: 15000 }
};

const BudgetTable = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Budget Overview
      </Typography>
      <Grid container spacing={3}>
        {departments.map((department) => (
          <Grid item xs={12} md={6} lg={4} key={department}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                {department}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Budget: LKR {departmentBudgets[department].budget.toLocaleString()}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Used: LKR {departmentBudgets[department].used.toLocaleString()} 
              </Typography>
              <Tooltip title={`Used: ${Math.round((departmentBudgets[department].used / departmentBudgets[department].budget) * 100)}%`} arrow>
                <LinearProgress
                  variant="determinate"
                  value={(departmentBudgets[department].used / departmentBudgets[department].budget) * 100}
                  sx={{ height: 20, marginBottom: 2 }}
                />
              </Tooltip>
              <Button
                component={Link}
                to={`/department-transactions/${department}`}
                variant="outlined"
              >
                View Transactions
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BudgetTable;
