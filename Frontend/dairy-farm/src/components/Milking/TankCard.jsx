import React, { useState, useEffect } from 'react';
import { Card, CardContent, MenuItem, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import TankStructure from './TankStructure';
import axios from 'axios';

const TankCard = ({ tank }) => {
  const { tankId, capacity, availableMilk, storedMilkBatches } = tank;
  const percentage = (availableMilk / capacity);
  const [isEditing, setIsEditing] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [previousFlippedState, setPreviousFlippedState] = useState(false);
  const [milkBatchOptions, setMilkBatchOptions] = useState([]);
  const [newMilkBatch, setNewMilkBatch] = useState('');
  const [amountToRemove, setAmountToRemove] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchMilkBatchData();
  }, []);

  const fetchMilkBatchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/milkingData');
      if (response.data.success) {
        const batchIds = response.data.data.map(batch => batch.milkBatchId);
        setMilkBatchOptions(batchIds);
      } else {
        console.error('Failed to fetch milking data:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching milking data:', error);
    }
  };

  const handleCancelClick = () => {
    setIsFlipped(previousFlippedState);
    setIsEditing(false);
  };

  const handleUpdateClick = () => {
    setPreviousFlippedState(isFlipped);
    setIsFlipped(!isFlipped);
  };

  const handleSaveClick = async () => {
    try {
      if (!newMilkBatch && typeof amountToRemove === 'undefined') {
        console.log('New milk batch and amount to remove are empty. Skipping addition and subtraction.');
        return;
      }
  
      if (newMilkBatch) {
        const response = await axios.put(`http://localhost:3000/api/milkingStorage/${tankId}`, {
          storedMilkBatches: [...storedMilkBatches, newMilkBatch]
        });
        console.log(response.data);
    
        const milkBatchResponse = await axios.get(`http://localhost:3000/api/milkingData/${newMilkBatch}`);
        const amountOfMilk = milkBatchResponse.data.amountOfMilk;
    
        const updateAvailableMilkResponse = await axios.put(`http://localhost:3000/api/milkingStorage/updateAvailableMilk/${tankId}`, {
          amountOfMilk
        });
        console.log(updateAvailableMilkResponse.data);
      }
  
      if (typeof amountToRemove !== 'undefined') {
        const subtractAvailableMilkResponse = await axios.put(`http://localhost:3000/api/milkingStorage/subtractAvailableMilk/${tankId}`, {
          amountToSubtract: -amountToRemove
        });
        console.log(subtractAvailableMilkResponse.data);
      }
    } catch (error) {
      console.error('Error updating stored milk batches:', error);
    }
  };
  
  
  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/milkingStorage/${tankId}`);
      console.log(response.data);
      onDelete(tankId);
    } catch (error) {
      console.error('Error deleting tank:', error);
    }
    setOpenDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  return (
    <div className="tank-card-container">
      <Card className={`tank-card ${isFlipped ? 'flipped' : ''}`} sx={{ width: 370, height: 440}} style={{borderRadius: '15px', backgroundColor: '#A8C7FF'}} >
        <div className="card-inner">
          <div className="card-back">
            <Typography className="tankTitle" variant='h6' style={{textAlign: 'center', marginTop: '10px'}}>Update Tank #{tankId}</Typography>
            <CardContent sx={{paddingTop: '0'}}>
              <div>
                  <TextField
                    label="Amount of Milk to Remove (In Litres)"
                    type='number'
                    fullWidth
                    style={{ backgroundColor: '#fff', marginTop: '56px', borderRadius: '5px' }}
                    value={amountToRemove}
                    onChange={(e) => setAmountToRemove(e.target.value)}
                  />
                  <TextField
                    select
                    label="Select Milk Batch ID"
                    fullWidth
                    style={{backgroundColor: '#fff', marginTop: '20px', borderRadius: '5px'}}
                    value={newMilkBatch}
                    onChange={(e) => setNewMilkBatch(e.target.value)}
                  >
                    {milkBatchOptions.map((batchId) => (
                      <MenuItem key={batchId} value={batchId}>
                        {batchId}
                      </MenuItem>
                    ))}
                  </TextField>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '158px' }}>
                    <Button
                          variant="text"
                          aria-label="edit"
                          onClick={handleCancelClick}
                          style={{
                              fontWeight: 'bold',
                              fontFamily: 'Poppins',
                              backgroundColor: '#F3797E',
                              color: '#fff',
                              width: '160px',
                              borderRadius: '15px'
                          }}
                      >
                      Cancel
                      </Button>
                    <Button
                          variant="text"
                          aria-label="edit"
                          onClick={handleSaveClick}
                          style={{
                              fontWeight: 'bold',
                              fontFamily: 'Poppins',
                              backgroundColor: '#38775B',
                              color: '#fff',
                              width: '160px',
                              borderRadius: '15px'
                          }}
                      >
                      Save
                      </Button>
                  </div>
              </div>
            </CardContent>
          </div>
          <div className="card-front">
            <Typography className="tankTitle" variant='h6' style={{textAlign: 'center', marginTop: '10px'}}>Tank Number: #{tankId}</Typography>
            <CardContent>
              <TankStructure percentage={percentage}/>
              <div className='tank-details'>
                  <div className='tank-detail'>
                      <Typography variant="h6" fontFamily={'Poppins'} fontSize={'18px'}>Capacity:</Typography>
                      <Typography variant="h6" fontFamily={'Poppins'} fontSize={'18px'}>{capacity} Litres</Typography>
                  </div>
                  <div className='tank-detail'>
                      <Typography variant="h6" fontFamily={'Poppins'} fontSize={'18px'}>Available Milk:</Typography>
                      <Typography variant="h6" fontFamily={'Poppins'} fontSize={'18px'}>{availableMilk} Litres</Typography>
                  </div>
                  <div className='tank-detail'>
                      <Typography variant="h6" fontFamily={'Poppins'} fontSize={'18px'}>Stored Milk Batches:</Typography>
                      <Typography variant="h6" fontFamily={'Poppins'} fontSize={'18px'}>{storedMilkBatches.join(', ')}</Typography>
                  </div>
              
                  <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '16px'}}>
                    <Button
                      variant="text"
                      aria-label="delete"
                      onClick={handleDeleteClick}
                      style={{
                        fontWeight: 'bold',
                        fontFamily: 'Poppins',
                        backgroundColor: '#F3797E',
                        color: '#fff',
                        width: '160px',
                        borderRadius: '15px'
                      }}
                    >
                      Delete
                    </Button>
                    <Dialog
                      open={openDialog}
                      onClose={handleCancelDelete}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure you want to delete this tank?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCancelDelete} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                          Confirm
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Button
                        variant="text"
                        aria-label="edit"
                        onClick={handleUpdateClick}
                        style={{
                            fontWeight: 'bold',
                            fontFamily: 'Poppins',
                            backgroundColor: '#38775B',
                            color: '#fff',
                            width: '160px',
                            borderRadius: '15px'
                        }}
                    >
                    Update
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    );
};

export default TankCard;

