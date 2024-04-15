import React, { useState } from 'react';
import { IconButton, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';

function ProcessDeleteButton({ id, onDeleted }) {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = async () => {
    try {
      // Send a DELETE request to the backend endpoint to delete the process with the specified ID
      await axios.delete(`http://localhost:3000/api/productBatchCrud/productBatch/${id}`);
      
      // Notify parent component that a process has been deleted
      onDeleted();
      
      // Handle successful deletion (e.g., update UI, display a success message)
      setSuccessMessage(`Successfully Deleted!`);
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Error deleting process:', error);
      setErrorMessage(`Error deleting process | ID : ${id}`);
    }
  };

  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleConfirmDelete = () => {
    handleDelete();
    handleCloseConfirmation();
  };

  const handleSnackbarClose = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <>
      <IconButton color="error" onClick={handleOpenConfirmation}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={openConfirmation}
        onClose={handleCloseConfirmation}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this process?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
      <Snackbar 
        open={!!successMessage} 
        autoHideDuration={2000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
          {successMessage}
        </MuiAlert>
      </Snackbar>
      <Snackbar 
        open={!!errorMessage} 
        autoHideDuration={2000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default ProcessDeleteButton;
