import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Grid, LinearProgress, Button, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Slider, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { green } from "@mui/material/colors";
import axios from "axios";

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

// Define initial budget values
const initialDepartmentBudgets = {
  Veterinary: 10000,
  Milking: 20000,
  Grazing: 15000,
  Production: 30000,
  HR: 25000,
  CRM: 20000,
  Sales: 35000,
  Finance: 40000,
  Miscellaneous: 20000
};
const UsedBudgets = {
  Veterinary: 5000,
  Milking: 2500,
  Grazing: 3000,
  Production: 4000,
  HR: 2000,
  CRM: 1500,
  Sales: 3000,
  Finance: 4500,
  Miscellaneous: 2000
};

const BudgetTable = () => {
  const [open, setOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [newBudget, setNewBudget] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [departmentBudgets, setDepartmentBudgets] = useState(() => {
    const storedBudgets = localStorage.getItem("departmentBudgets");
    return storedBudgets ? JSON.parse(storedBudgets) : initialDepartmentBudgets;
  });
  const [departmentExpenses, setDepartmentExpenses] = useState({});

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/transactions/total-expenses");
        setDepartmentExpenses(response.data);
      } catch (error) {
        console.error("Error fetching department expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    // Update local storage whenever departmentBudgets change
    localStorage.setItem("departmentBudgets", JSON.stringify(departmentBudgets));
  }, [departmentBudgets]);

  const handleEditOpen = (department) => {
    setSelectedDepartment(department);
    setOpen(true);
    setNewBudget(departmentBudgets[department]);
    setSliderValue(departmentBudgets[department]);
  };

  const handleEditClose = () => {
    setOpen(false);
  };

  const handleBudgetChange = (event) => {
    const value = parseInt(event.target.value);
    setNewBudget(value);
    setSliderValue(value);
  };

  const handleSaveBudget = () => {
    setDepartmentBudgets(prevBudgets => ({
      ...prevBudgets,
      [selectedDepartment]: newBudget
    }));
    setOpen(false);
  };

  return (
    <Container sx={{ textAlign: 'center', marginLeft: '15%', marginBottom: '2%'}}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
        Budget Overview
      </Typography>
      <Grid container spacing={4}>
        {departments.map((department) => (
          <Grid item xs={12} md={6} lg={4} key={department}>
            <Paper sx={{ padding: 2, backgroundColor: '#E3F6EF' }}>
              <Typography variant="h6" gutterBottom >
                {department}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Total Budget: LKR {(departmentBudgets[department] ).toLocaleString()}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Used Budget: LKR {(UsedBudgets[department] || 0).toLocaleString()}
              </Typography>
              <Tooltip title={`Used: ${Math.round(((UsedBudgets[department] || 0) / departmentBudgets[department]) * 100)}%`} arrow>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(((UsedBudgets[department] || 0) / departmentBudgets[department]) * 100, 100)}
                  sx={{ height: 20, marginBottom: 2 }}
                />
              </Tooltip>
              <Box display="flex" justifyContent="space-between" alignItems="center" >
                <Button
                  onClick={() => handleEditOpen(department)}
                  variant="outlined"
                  sx={{
                    marginLeft: 1,
                    color: 'white',
                    borderColor: 'green',
                    backgroundColor: '#38775B',
                    '&:hover': {
                      backgroundColor: '#45926F',
                    }
                  }}
                >
                  Edit
                </Button>
                <Button
                  component={Link}
                  to={`/department-transactions/${department}`}
                  variant="outlined"
                  sx={{
                    marginLeft: 1,
                    color: 'white',
                    borderColor: 'green',
                    backgroundColor: '#38775B',
                    '&:hover': {
                      backgroundColor: '#45926F',
                    }
                  }}                >
                  <Link to="/financetrans" style={{ textDecoration: 'none', color: 'inherit', }}>
                    View Transactions
                  </Link>
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleEditClose} >
        <DialogTitle> Edit Budget</DialogTitle>
        <DialogContent>
          <Box mb={2} sx={{ marginTop: '5px'}}>
            <TextField
              type="number"
              value={newBudget}
              onChange={handleBudgetChange}
              fullWidth
              label="New Budget (LKR)"
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleSaveBudget} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BudgetTable;
