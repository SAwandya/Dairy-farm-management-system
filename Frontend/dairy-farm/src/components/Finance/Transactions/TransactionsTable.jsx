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
  Box,
} from "@mui/material";
import axios from "axios";
import '../../../styles/Finance/MainDashboard/DashboardContent.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Snackbar, SnackbarContent } from "@mui/material";


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
    type: "Income",
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
    setTransactionToDelete(transaction);
    setDeleteDialogOpen(true);
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
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === selectedTransaction.id ? selectedTransaction : transaction
      )
    );
  //           if (
  //   transactions.type &&
  //   transactions.description &&
  //   transactions.department &&
  //   transactions.value
  // ) {
  //   try {
  //     const response = await axios.put("http://localhost:3000/api/transaction/" + transaction._id, transactions);
  //     console.log("Transaction added successfully:", response.data);
      
  //     // Update the transactions state with the new transaction
  //     setTransactions([...transactions, response.data]);
  //     setOpenAddDialog(false);
      
  //     // Reset newTransaction state
  //     setNewTransaction({
  //       type: "Income",
  //       description: "",
  //       department: "",
  //       value: "0",
  //     });
  //   } catch (error) {
  //     console.error("Error adding transaction:", error);
  //   }
  // }
  // {
  //   }

    setEditDialogOpen(false);
    setSelectedTransaction(null);
    handleToastOpen("Transaction edited successfully");

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
    vertical: "bottom",
    horizontal: "right",
  }}
  open={toastOpen}
  autoHideDuration={2000}
  onClose={handleToastClose}
>
  <SnackbarContent
    message={toastMessage}
    action={null}
    style={{
    backgroundColor: '#38775B', // Change to your desired background color
    color: '#ffffff', // Change to your desired text color
  }}
  />
</Snackbar>
      <Box className="paper"
        sx={{
          backgroundColor: "#f0f0f0",
          padding: "20px",
          borderRadius: "10px",
          flexDirection: "column",
          alignItems: "center",

        }}
      >   
      <TextField
          label="Search Transactions"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginBottom: 2, width: "30%" }}
        />
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
        />
        <Button
          variant="contained"
          onClick={() => setOpenAddDialog(true)}
          sx={{ marginTop: 1 }}
        >
          Add Transaction
        </Button>
        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
          <DialogTitle>Add New Transaction</DialogTitle>
          <DialogContent>
            <TextField
              name="date"
              label="Date"
              type="date"
              value={newTransaction.date}
              onChange={handleNewTransactionChange}
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: new Date().toISOString().split("T")[0] }} // Set the max date to today
              sx={{ marginBottom: 2 }}
              fullWidth
              required
            />
            <FormControl fullWidth sx={{ marginBottom: 2 }} required>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                id="type-select"
                name="type"
                value={newTransaction.type}
                onChange={handleNewTransactionChange}
                label="Type"
              >
                <MenuItem value="Income">Income</MenuItem>
                <MenuItem value="Expense">Expense</MenuItem>
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
            />
            <FormControl fullWidth sx={{ marginBottom: 2 }} required>
              <InputLabel id="department-label">Department</InputLabel>
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
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddTransaction} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={editDialogOpen}
          onClose={handleCloseEditDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogContent>
            <TextField
              name="date"
              label="Date"
              type="date"
              value={selectedTransaction ? selectedTransaction.date : ""}
              onChange={handleEditTransactionChange}
              sx={{ marginBottom: 2 }}
              fullWidth
              required
            />
            <FormControl fullWidth sx={{ marginBottom: 2 }} required>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                id="type-select"
                name="type"
                value={selectedTransaction ? selectedTransaction.type : ""}
                onChange={handleEditTransactionChange}
                label="Type"
              >
                <MenuItem value="Income">Income</MenuItem>
                <MenuItem value="Expense">Expense</MenuItem>
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
              <InputLabel id="department-label">Department</InputLabel>
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
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Cancel</Button>
            <Button onClick={handleSaveEdit} color="primary">
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
          <DialogTitle>{"Are you sure you want to delete this transaction?"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteTransaction} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <TableContainer component={Paper} className="tableContainer" sx={{ width: "100%", marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Value (LKR)</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions
                .filter((transaction) =>
                  transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.department}</TableCell>
                  <TableCell>{`${transaction.value}.00`}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditTransaction(transaction)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteConfirmation(transaction)} color="error">
                      Delete
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
