import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Container } from '@mui/material';

const RegisterForm = ({ handleSubmit, handleOnChange, handleClose, rest }) => {
  const [validationError, setValidationError] = useState('');

  const validateForm = () => {
    const currentDate = new Date();
    const selectedDate = new Date(rest.birthDate);

    if (selectedDate >= currentDate) {
      setValidationError('');
      return false;
    }

    setValidationError('');
    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e);
    } else {
      
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Date is Invalid!"
      });
    }
  };
  return (
    <Container sx={{
      backgroundColor: '#fff',
      padding: 3,
      borderRadius: 2,
      boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
      position: 'relative',
    }}>
      <CloseIcon sx={{ position: 'absolute', top: 22, right: 22, cursor: 'pointer' }} onClick={handleClose} />
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={3} sx={{ marginBottom: 2, marginTop: 0 }}>
          <Grid item xs={6}>
            <TextField id="earTag" name="earTag" label="Ear Tag ID" required onChange={handleOnChange} value={rest.earTag || ''} fullWidth sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }} />
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth>
              <InputLabel id="batch">Batch *</InputLabel>
              <Select id="batch" name="batch" label="batch" required onChange={handleOnChange} value={rest.batch || ''} sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}>
                <MenuItem value="F001">F001</MenuItem>
                <MenuItem value="F002">F002</MenuItem>
                <MenuItem value="F003">F003</MenuItem>
                <MenuItem value="F004">F004</MenuItem>
                <MenuItem value="F005">F005</MenuItem>

                <MenuItem value="M001">M001</MenuItem>
                <MenuItem value="M002">M002</MenuItem>
                <MenuItem value="M003">M003</MenuItem>
                <MenuItem value="M004">M004</MenuItem>
                <MenuItem value="M005">M005</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginBottom: 2 }}>
          <Grid item xs={6}>
            <TextField id="location" name="location" label="Barn ID" required onChange={handleOnChange} value={rest.location || ''} fullWidth sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }} />
          </Grid>
          <Grid item xs={6}>
            <TextField id="name" name="name" label="Name" required onChange={handleOnChange} value={rest.name || ''} fullWidth sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }} />
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginBottom: 2 }}>
          <Grid item xs={6}>
            <TextField id="breed" name="breed" label="Breed" required onChange={handleOnChange} value={rest.breed || ''} fullWidth sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }} />
          </Grid>
          <Grid item xs={6}>
            <TextField id="weight" name="weight" label="Weight (kg)" type="number" required onChange={handleOnChange} value={rest.weight || ''} fullWidth sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }} />
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginBottom: 2 }}>
          <Grid item xs={6}>
            <TextField id="color" name="color" label="Colour" required onChange={handleOnChange} value={rest.color || ''} fullWidth sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }} />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="gender">Gender *</InputLabel>
              <Select id="gender" name="gender" label="gender" required onChange={handleOnChange} value={rest.gender || ''} sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginBottom: 2 }}>
          <Grid item xs={6}>
            <TextField id="age" name="age" label="Age" required onChange={handleOnChange} value={rest.age || ''} fullWidth sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }} />
          </Grid>
          <Grid item xs={6}>
  <TextField
    id="birthDate"
    name="birthDate"
    type="date"
    labelId="birthdate"
    label="Birth Date"
    required
    onChange={handleOnChange}
    value={(rest.birthDate ? new Date(rest.birthDate).toISOString().split('T')[0] : '')}
    InputLabelProps={{
      shrink: true,
    }}
  
    fullWidth
    sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}
  />
  {validationError && <span style={{ color: 'red' }}>{validationError}</span>}
</Grid>


        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2, borderRadius: 2 }}>Submit</Button>
      </form>
    </Container>
  );
};

export default RegisterForm;
