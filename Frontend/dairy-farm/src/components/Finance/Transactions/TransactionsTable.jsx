import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControlLabel,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Box,
} from "@mui/material";
import axios from "axios";
import '../../../styles/Finance/MainDashboard/DashboardContent.css';
import "react-toastify/dist/ReactToastify.css";
import { Snackbar, SnackbarContent } from "@mui/material";
import Swal from "sweetalert2";
import { color } from "@mui/system";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';




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

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([

  ]);
  const [showIncome, setShowIncome] = useState(true);
  const [showExpense, setShowExpense] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toISOString().split("T")[0],
    type: "Expense",
    description: "",
    department: "",
    value: "0",
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
const [toastOpen, setToastOpen] = useState(false);
const [selectedDepartment, setSelectedDepartment] = useState("");
const [formSubmitted, setFormSubmitted] = useState(false);




  const handleShowIncomeChange = (event) => {
    setShowIncome(event.target.checked);
  };

  const handleShowExpenseChange = (event) => {
    setShowExpense(event.target.checked);
  };
const handleToastOpen = (message) => {
  setToastMessage(message);
  setToastOpen(true);
};

const handleToastClose = () => {
  setToastOpen(false);
};

const handleAddTransaction = async () => {
  // Validate each field before adding the transaction
  if (
    newTransaction.type &&
    newTransaction.description &&
    newTransaction.department &&
    newTransaction.value
  ) {
    try {
      const response = await axios.post("http://localhost:3000/api/transaction", newTransaction);
      console.log("Transaction added successfully:", response.data);
      handleToastOpen("Transaction added successfully");
      
      // Update the data state with the new transaction
      setData(prevData => [...prevData, response.data]);
      setOpenAddDialog(false);
      
      // Reset newTransaction state
      setNewTransaction({
        date: new Date().toISOString().split("T")[0],
        type: "Income",
        description: "",
        department: "",
        value: "0",
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  } else {
    // Display error message for incomplete fields


    setFormSubmitted(true);
  }
};



  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setEditDialogOpen(true);
    console.log(transactions);
  };

  useEffect(() => {
  console.log(transactions);
}, [transactions]);

  const handleDeleteConfirmation = (transaction) => {
    Swal.fire({
      title: "Are you sure you want to delete this transaction?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#38775B",
      confirmButtonText: "Yes, delete it!"
      
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/api/transaction/${transaction._id}`);
          console.log("Transaction deleted successfully");

          handleToastOpen("Transaction deleted successfully");

          // Update the data state to remove the deleted transaction
          setData(prevData => prevData.filter(item => item._id !== transaction._id));
          setTransactionToDelete(null);
        } catch (error) {
          console.error("Error deleting transaction:", error);
          Swal.fire(
            "Error!",
            "An error occurred while deleting the transaction.",
            "error"
          );
        }
      }
    });
  };

const handleDeleteTransaction = async () => {
  try {
    await axios.delete(`http://localhost:3000/api/transaction/${transactionToDelete._id}`);
    console.log("Transaction deleted successfully");

    handleToastOpen("Transaction deleted successfully");

    // Update the data state to remove the deleted transaction
    setData(prevData => prevData.filter(transaction => transaction._id !== transactionToDelete._id));
    setDeleteDialogOpen(false);
    setTransactionToDelete(null);
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
};


  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setTransactionToDelete(null);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedTransaction(null);
  };

const handleSaveEdit = async () => {
  try {
    
    // Exclude _id and __v from the selectedTransaction
    const { _id, __v, ...updatedTransaction } = selectedTransaction;

    // Make the PUT request to update the transaction
    const response = await axios.put(
      `http://localhost:3000/api/transaction/${_id}`,
      updatedTransaction
    );

    console.log("Transaction edited successfully:", response.data);

    // Update the transactions state by replacing the edited transaction
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction._id === _id ? response.data : transaction
      )
    );

    // Close the edit dialog and reset selectedTransaction
    setEditDialogOpen(false);
    setSelectedTransaction(null);

    // Display success toast
    handleToastOpen("Transaction edited successfully");

    setData((prevData) =>
  prevData.map((transaction) =>
    transaction._id === _id ? response.data : transaction
  )
);

  } catch (error) {
    console.error("Error editing transaction:", error);
  }

  
};





  const handleNewTransactionChange = (event) => {
    const { name, value } = event.target;

    if (name === "value") {
      // Validate value to ensure it's not negative
      if (parseFloat(value) < 0) {
        // Don't update the state if value is negative
        return;
      }
    }

    setNewTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  };

  const handleEditTransactionChange = (event) => {
    const { name, value } = event.target;

    setSelectedTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  };

  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const handleDepartmentChange = (event) => {
  setSelectedDepartment(event.target.value);
};

const filteredTransactions = data?.filter((transaction) => {
  if (showIncome && showExpense) {
    return true;
  }
  if (showIncome) {
    return transaction.type === "Income";
  }
  if (showExpense) {
    return transaction.type === "Expense";
  }
  return false;
}).filter(transaction => {
  if (selectedDepartment === "") {
    return true;
  }
  return transaction.department === selectedDepartment;
});
  


 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/transaction");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };


    fetchData();


    // Clean-up function
    return () => {
      // Perform any clean-up (if necessary)
    };
  }, []); // Empty dependency array to run effect only once

// Define the formatDate function inside your component or in a utilities file
function formatDate(dateString) {
  const options = {month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <Container className="container">
            <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={toastOpen}
        autoHideDuration={2000}
        onClose={handleToastClose}
      >
</Snackbar>
<Box className="paper"
  sx={{
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderRadius: "10px",
    flexDirection: "column",
    width: '100%',
    marginLeft: '7%' ,
    alignItems: "center",
  }}
>
  <Box sx={{ display: 'flex', width: '100%', marginBottom: 1 }}>
    <TextField
      label="Search Transactions"
      variant="outlined"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{ marginRight: 1, flex: 1 }} // Adjust margin and flex as needed
    />
    <FormControl fullWidth sx={{ flex: 1 }}>
      <InputLabel id="department-filter-label" sx={{ fontFamily: 'Poppins', fontWeight: 500}}>Filter by Department</InputLabel>
      <Select
        labelId="department-filter-label"
        id="department-filter-select"
        value={selectedDepartment}
        onChange={handleDepartmentChange}
        label="Filter by Department"
      >
        <MenuItem value="" sx={{ fontFamily: 'Poppins', fontWeight: 500}}>All Departments</MenuItem>
        {departments.map((department) => (
          <MenuItem key={department} value={department}>
            {department}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
  <FormControlLabel
    control={
      <Checkbox
        checked={showIncome}
        onChange={handleShowIncomeChange}
        color="primary"
      />
    }
    label="Income"
  />
  <FormControlLabel
    control={
      <Checkbox
        checked={showExpense}
        onChange={handleShowExpenseChange}
        color="primary"
      />
    }
    label="Expense"
  />          <Button
            variant="contained"
            onClick={() => setOpenAddDialog(true)}
            sx={{
              color: 'white',
              borderColor: 'green',
              backgroundColor: '#38775B',
              fontFamily: 'Poppins',
               fontWeight: 500,
              '&:hover': {
                backgroundColor: '#45926F',
              },
            }}
          >Add Transaction</Button>

        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
          <DialogTitle sx={{ fontFamily: 'Poppins', fontWeight: 500}}>Add New Transaction</DialogTitle>
          <DialogContent>
            <TextField
              name="date"
              label="Date"
              type="date"
              value={newTransaction.date}
              onChange={handleNewTransactionChange}
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: new Date().toISOString().split("T")[0] }} // Set the max date to today
              sx={{ marginBottom: 2 , marginTop: '7px' }}
              fullWidth
              required
            />
                <FormControl fullWidth sx={{ marginBottom: 2 }} required>
      <InputLabel id="type-label" sx={{ fontFamily: 'Poppins', fontWeight: 500}}>Type</InputLabel>
      <Select
        labelId="type-label"
        id="type-select"
        name="type"
        value={newTransaction.type}
        onChange={handleNewTransactionChange}
        label="Type"
      >
        <MenuItem value="Income" sx={{ fontFamily: 'Poppins', fontWeight: 500}}>Income</MenuItem>
        <MenuItem value="Expense" sx={{ fontFamily: 'Poppins', fontWeight: 500}}>Expense</MenuItem>
      </Select>
    </FormControl>
            <TextField
              name="description"
              label="Description"
              value={newTransaction.description}
              onChange={handleNewTransactionChange}
              sx={{ marginBottom: 2 }}
              fullWidth
              required
               helperText={formSubmitted && !newTransaction.description ? "*Please enter a description" : ""}
              error={formSubmitted && !newTransaction.description}
            />
            <FormControl fullWidth sx={{ marginBottom: 2 }} required>
              <InputLabel id="department-label" sx={{ fontFamily: 'Poppins', fontWeight: 500}}>Department</InputLabel>
              <Select
                labelId="department-label"
                id="department-select"
                name="department"
                value={newTransaction.department}
                onChange={handleNewTransactionChange}
                label="Department"
              >
                {departments.map((department) => (
                  <MenuItem key={department} value={department}>
                    {department}
                  </MenuItem>
                ))}
              </Select>
                {formSubmitted && !newTransaction.department && <FormHelperText sx={{ color: 'red' }}>*Please select a department</FormHelperText>}
            </FormControl>
            <TextField
              name="value"
              label="Value (LKR)"
              type="number"
              value={newTransaction.value}
              onChange={handleNewTransactionChange}
              sx={{ marginBottom: 2 }}
              fullWidth
              required
              helperText={(formSubmitted && newTransaction.value === "0") ? "*Please enter a correct value" : ""}
              error={formSubmitted && newTransaction.value === "0"}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)} sx={{ fontFamily: 'Poppins', fontWeight: 500}}>Cancel</Button>
            <Button onClick={handleAddTransaction} color="primary" sx={{ fontFamily: 'Poppins', fontWeight: 500}}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={editDialogOpen}
          onClose={handleCloseEditDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle sx={{ fontFamily: 'Poppins', fontWeight: 500}}>Edit Transaction</DialogTitle>
          <DialogContent>
            <TextField
              name="date"
              label="Date"
              type="date"
              value={selectedTransaction ? selectedTransaction.date.split("T")[0] : ""}
              onChange={handleEditTransactionChange}
              sx={{ marginBottom: 2 , marginTop: '7px'}}
              fullWidth
              required
              inputProps={{ max: new Date().toISOString().split("T")[0] }}
            />
            <FormControl fullWidth sx={{ marginBottom: 2 }} required>
              <InputLabel id="type-label" sx={{ fontFamily: 'Poppins', fontWeight: 500}}>Type</InputLabel>
              <Select
                labelId="type-label"
                id="type-select"
                name="type"
                value={selectedTransaction ? selectedTransaction.type : ""}
                onChange={handleEditTransactionChange}
                label="Type"
              >
                <MenuItem value="Income" sx={{ fontFamily: 'Poppins', fontWeight: 500}}>Income</MenuItem>
                <MenuItem value="Expense" sx={{ fontFamily: 'Poppins', fontWeight: 500}}>Expense</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="description"
              label="Description"
              value={selectedTransaction ? selectedTransaction.description : ""}
              onChange={handleEditTransactionChange}
              sx={{ marginBottom: 2 }}
              fullWidth
              required
            />
            <FormControl fullWidth sx={{ marginBottom: 2 }} required>
              <InputLabel id="department-label" sx={{ fontFamily: 'Poppins', fontWeight: 500}}>Department</InputLabel>
              <Select
                labelId="department-label"
                id="department-select"
                name="department"
                value={selectedTransaction ? selectedTransaction.department : ""}
                onChange={handleEditTransactionChange}
                label="Department"
              >
                {departments.map((department) => (
                  <MenuItem key={department} value={department}>
                    {department}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="value"
              label="Value (LKR)"
              type="number"
              value={selectedTransaction ? selectedTransaction.value : ""}
              onChange={handleEditTransactionChange}
              sx={{ marginBottom: 2 }}
              fullWidth
              required
              inputProps={{ min: 0 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} sx={{ fontFamily: 'Poppins', fontWeight: 500}}>Cancel</Button>
            <Button onClick={handleSaveEdit} color="primary" sx={{ fontFamily: 'Poppins', fontWeight: 500}}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={deleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle sx={{ fontFamily: 'Poppins', fontWeight: 400}}>{"Are you sure you want to delete this transaction?"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary" sx={{ fontFamily: 'Poppins', fontWeight: 500}}>
              Cancel
            </Button>
            <Button onClick={handleDeleteTransaction} color="error" autoFocus sx={{ fontFamily: 'Poppins', fontWeight: 500}}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <TableContainer component={Paper} className="tableContainer" sx={{ width: "100%", marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow >
                <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600}}>Date</TableCell>
                <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600}}>Type</TableCell>
                <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600}}>Description</TableCell>
                <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600}}>Department</TableCell>
                <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600}}>Value (LKR)</TableCell>
                <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 600}}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions
                .filter((transaction) =>
                  transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .reverse()
                .map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 400}}>{formatDate(transaction.date)}</TableCell>
                  <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 400}}>{transaction.type}</TableCell>
                  <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 400}}>{transaction.description}</TableCell>
                  <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 400}}>{transaction.department}</TableCell>
                  <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 400}}>{`${transaction.value}.00`}</TableCell>
                  <TableCell sx={{ fontFamily: 'Poppins', fontWeight: 400}}>
                    <Button onClick={() => handleEditTransaction(transaction)}  sx={{ fontFamily: 'Poppins', fontWeight: 500}}>
                      Edit<EditIcon />
                    </Button>
                    <Button onClick={() => handleDeleteConfirmation(transaction)} color="error"  sx={{ fontFamily: 'Poppins', fontWeight: 500}}>
                      Delete<DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default TransactionsTable;