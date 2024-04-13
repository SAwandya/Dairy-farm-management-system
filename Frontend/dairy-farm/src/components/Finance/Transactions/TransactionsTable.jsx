import React, { useState } from "react";
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
    {
      id: 1,
      date: new Date().toISOString().split("T")[0],
      type: "income",
      description: "Salary",
      department: "Finance",
      value: "2000",
    },
    {
      id: 2,
      date: new Date().toISOString().split("T")[0],
      type: "expense",
      description: "Groceries",
      department: "Sales",
      value: "100",
    },
    // Add more dummy data...
  ]);
  const [showIncome, setShowIncome] = useState(true);
  const [showExpense, setShowExpense] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toISOString().split("T")[0],
    type: "income",
    description: "",
    department: "",
    value: "0",
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleShowIncomeChange = (event) => {
    setShowIncome(event.target.checked);
  };

  const handleShowExpenseChange = (event) => {
    setShowExpense(event.target.checked);
  };

  const handleAddTransaction = () => {
    // Validate each field before adding the transaction
    if (
      newTransaction.date &&
      newTransaction.type &&
      newTransaction.description &&
      newTransaction.department &&
      newTransaction.value
    ) {
      setTransactions([newTransaction, ...transactions]);
      setOpenAddDialog(false);
      // Reset newTransaction state
      setNewTransaction({
        date: new Date().toISOString().split("T")[0],
        type: "income",
        description: "",
        department: "",
        value: "0",
      });
    }
  };

  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setEditDialogOpen(true);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedTransaction(null);
  };

  const handleSaveEdit = () => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === selectedTransaction.id ? selectedTransaction : transaction
      )
    );
    setEditDialogOpen(false);
    setSelectedTransaction(null);
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

  const filteredTransactions = transactions.filter((transaction) => {
    if (showIncome && showExpense) {
      return true;
    }
    if (showIncome) {
      return transaction.type === "income";
    }
    if (showExpense) {
      return transaction.type === "expense";
    }
    return false;
  });

  return (
    <Container>
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
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
          sx={{ marginLeft: "auto", marginTop: 1 }}
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
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
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
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
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
        <TableContainer component={Paper} sx={{ width: "100%", marginTop: 2 }}>
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
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.department}</TableCell>
                  <TableCell>{`${transaction.value}.00`}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditTransaction(transaction)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteTransaction(transaction.id)}>
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
