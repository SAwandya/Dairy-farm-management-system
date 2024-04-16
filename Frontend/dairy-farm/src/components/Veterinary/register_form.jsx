import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Container,FormHelperText } from '@mui/material';

const RegisterForm = ({ handleSubmit, handleOnChange, handleClose, rest }) => {
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const currentDate = new Date();
    const selectedDate = new Date(rest.birthDate);

    let errors = {};
    let isValid = true;

    // Check for null or empty fields
    const requiredFields = [
      'earTag',
      'batch',
      'location',
      'name',
      'breed',
      'weight',
      'color',
      'gender',
      'age',
      'birthDate',
    ];

    requiredFields.forEach(field => {
      if (!rest[field]) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        isValid = false;
      }
    });

    // Check for weight positive
    if (rest.weight <= 0) {
      errors.weight = 'Weight must be a positive number.';
      isValid = false;
    }

    // Check for date is in past
    if (selectedDate >= currentDate) {
      errors.birthDate = 'Birth date must be in the past.';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
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
            <TextField
              id="earTag"
              name="earTag"
              label="Ear Tag ID"
              onChange={handleOnChange}
              value={rest.earTag || ''}
              fullWidth
              sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}
              error={!!validationErrors.earTag}
              helperText={validationErrors.earTag}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="batch">Batch</InputLabel>
              <Select
                id="batch"
                name="batch"
                label="Batch"
                onChange={handleOnChange}
                value={rest.batch || ''}
                sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}
                error={!!validationErrors.batch}
                helperText={validationErrors.batch}
              >
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
              <FormHelperText error={!!validationErrors.batch}>{validationErrors.batch}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginBottom: 2 }}>
          <Grid item xs={6}>
            <TextField
              id="location"
              name="location"
              label="Barn ID"
              onChange={handleOnChange}
              value={rest.location || ''}
              fullWidth
              sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}
              error={!!validationErrors.location}
              helperText={validationErrors.location}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="name"
              name="name"
              label="Name"
              onChange={handleOnChange}
              value={rest.name || ''}
              fullWidth
              sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}
              error={!!validationErrors.name}
              helperText={validationErrors.name}
            />
          </Grid> 
        </Grid>
        <Grid container spacing={3} sx={{ marginBottom: 2 }}>
          <Grid item xs={6}>
            <TextField
              id="breed"
              name="breed"
              label="Breed"
              onChange={handleOnChange}
              value={rest.breed || ''}
              fullWidth
              sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}
              error={!!validationErrors.breed}
              helperText={validationErrors.breed}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="weight"
              name="weight"
              label="Weight (kg)"
              type="number"
              onChange={handleOnChange}
              value={rest.weight || ''}
              fullWidth
              sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}
              error={!!validationErrors.weight}
              helperText={validationErrors.weight}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginBottom: 2 }}>
          <Grid item xs={6}>
            <TextField
              id="color"
              name="color"
              label="Colour"
              onChange={handleOnChange}
              value={rest.color || ''}
              fullWidth
              sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}
              error={!!validationErrors.color}
              helperText={validationErrors.color}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                id="gender"
                name="gender"
                label="Gender"
                onChange={handleOnChange}
                value={rest.gender || ''}
                sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}
                error={!!validationErrors.gender}
              >
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
              </Select>
              <FormHelperText error={!!validationErrors.gender}>{validationErrors.gender}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginBottom: 2 }}>
          <Grid item xs={6}>
            <TextField
              id="age"
              name="age"
              label="Age"
              onChange={handleOnChange}
              value={rest.age || ''}
              fullWidth
              sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}
              error={!!validationErrors.age}
              helperText={validationErrors.age}
            />
          </Grid>
          <Grid item xs={6}>
          <TextField
              id="birthDate"
              name="birthDate"
              type="date"
              label="Birth Date"
              onChange={handleOnChange}
              value={(rest.birthDate ? new Date(rest.birthDate).toISOString().split('T')[0] : '')}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}
              error={!!validationErrors.birthDate}
              helperText={validationErrors.birthDate}
              inputProps={{
                max: new Date().toISOString().split('T')[0], // Max date is today
              }}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2, borderRadius: 2 }}>Submit</Button>
      </form>
    </Container>
  );
};

export default RegisterForm;
