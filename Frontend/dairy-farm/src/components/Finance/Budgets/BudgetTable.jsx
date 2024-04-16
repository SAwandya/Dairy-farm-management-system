import React, { useState } from "react";
import { Container, Typography, Paper, Grid, LinearProgress, Button, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Slider, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { green } from "@mui/material/colors";

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

// Sample data for demonstration (values multiplied by 10x)
const departmentBudgets = {
  Veterinary: { budget: 100000, used: 80000 },
  Milking: { budget: 20000, used: 12000 },
  Grazing: { budget: 15000, used: 10000 },
  Production: { budget: 30000, used: 29000 },
  HR: { budget: 25000, used: 20000 },
  CRM: { budget: 20000, used: 15000 },
  Sales: { budget: 35000, used: 2000 },
  Finance: { budget: 40000, used: 22000 },
  Miscellaneous: { budget: 20000, used: 15000 }
};

const BudgetTable = () => {
  const [open, setOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [newBudget, setNewBudget] = useState("");
  const [sliderValue, setSliderValue] = useState(0);

  const handleEditOpen = (department) => {
    setSelectedDepartment(department);
    setOpen(true);
    setNewBudget(departmentBudgets[department].budget);
    setSliderValue(departmentBudgets[department].budget);
  };

  const handleEditClose = () => {
    setOpen(false);
  };

  const handleBudgetChange = (event, newValue) => {
    setSliderValue(newValue);
    setNewBudget(newValue);
  };

  const handleSaveBudget = () => {
    // Implement save functionality
    console.log(`New budget for ${selectedDepartment}: ${newBudget}`);
    setOpen(false);
  };

  return (
    <Container sx={{ textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Budget Overview
      </Typography>
      <Grid container spacing={4} >
        {departments.map((department) => (
          <Grid item xs={12} md={6} lg={4} key={department}>
            <Paper sx={{ padding: 2, backgroundColor: '#E3F6EF'}}>
              <Typography variant="h6" gutterBottom >
                {department}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Budget: LKR {(departmentBudgets[department].budget * 10).toLocaleString()}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Used: LKR {(departmentBudgets[department].used * 10).toLocaleString()} 
              </Typography>
              <Tooltip title={`Used: ${Math.round((departmentBudgets[department].used / departmentBudgets[department].budget) * 100)}%`} arrow>
                <LinearProgress
                  variant="determinate"
                  value={(departmentBudgets[department].used / departmentBudgets[department].budget) * 100}
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
                  <Link to="/financetrans" style={{ textDecoration: 'none', color: 'inherit',  }}>
                  View Transactions
                  </Link>
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleEditClose}>
        <DialogTitle> Edit Budget</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Current Budget: LKR {(newBudget * 10).toLocaleString()}
            </Typography>
            <Slider
              value={sliderValue}
              onChange={handleBudgetChange}
              min={0}
              max={1000000}
              step={1000}
              aria-labelledby="continuous-slider"
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
