import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Container,
  FormHelperText,
} from '@mui/material';

const vaccineAnimForm = ({ handleSubmit, handleOnChange, handleClose, rest }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const initialVaccine = rest.vaccine || '';
  const [vaccine, setVaccine] = useState(initialVaccine);

  // Set date limits
  const currentDate = new Date().toISOString().split('T')[0];
  const minDate = new Date(new Date().setDate(new Date().getDate() - 30))
    .toISOString()
    .split('T')[0];

  const handleChange = (e) => {
    if (e && e.target && e.target.value) {
      setVaccine(e.target.value);
      handleOnChange(e);
    }
  };

  // Validate form
  const validateForm = (fieldName = '') => {
    let errors = {};
    let isValid = true;

    // Check for required fields
    const requiredFields = ['earTag', 'status', 'vaccine', 'age'];
    requiredFields.forEach((field) => {
      if (fieldName && field !== fieldName) return; 
      if (!rest[field]) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        isValid = false;
      }
    });

    // Check vaccinated date
    if (fieldName === 'vacdate' || !fieldName) {
      if (rest.vacdate) {
        const selectedDate = new Date(rest.vacdate);
        if (selectedDate < new Date(minDate) || selectedDate > new Date(currentDate)) {
          errors.vacdate = 'Vaccinated date must be today or within the last 14 days.';
          isValid = false;
        }
      } else {
        errors.vacdate = 'Vaccinated date is required.';
        isValid = false;
      }
    }

    // Check next date
    if (fieldName === 'nextdate' || !fieldName) {
      if (rest.nextdate) {
        const nextDate = new Date(rest.nextdate);
        if (nextDate <= new Date(currentDate)) {
          errors.nextdate = 'Next date must be after today.';
          isValid = false;
        }
      } else {
        errors.nextdate = 'Next date is required.';
        isValid = false;
      }
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(rest);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There were errors in the form!',
      });
    }
  };

  // Handle validation 
  const handleOnBlur = (e) => {
    const fieldName = e.target.name;
    if (fieldName) {
      validateForm(fieldName);
    }
  };

  return (
    <Container
      sx={{
        backgroundColor: '#fff',
        padding: 3,
        borderRadius: 2,
        boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
        position: 'relative',
        marginTop: '100px',
      }}
    >
      <CloseIcon sx={{ position: 'absolute', top: 22, right: 22, cursor: 'pointer' }} onClick={handleClose} />
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              id="earTag"
              name="earTag"
              label="Ear Tag ID"
              required
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              value={rest.earTag || ''}
              fullWidth
              sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}
              error={!!validationErrors.earTag}
              helperText={validationErrors.earTag}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="status"
              name="status"
              label="Status"
              required
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              value={rest.status || ''}
              fullWidth
              sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}
              error={!!validationErrors.status}
              helperText={validationErrors.status}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="vaccine">Vaccine</InputLabel>
              <Select
                labelId="vaccine"
                id="vaccine"
                name="vaccine"
                label="Vaccine"
                required
                onChange={handleChange}
                onBlur={handleOnBlur}
                value={vaccine}
                fullWidth
                sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}
                error={!!validationErrors.vaccine}
              >
                <MenuItem value="MastiVac">MastiVac</MenuItem>
                <MenuItem value="LSD">LSD</MenuItem>
                <MenuItem value="HS">HS</MenuItem>
                <MenuItem value="FMD">FMD</MenuItem>
              </Select>
              <FormHelperText error={!!validationErrors.vaccine}>
                {validationErrors.vaccine}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="age"
              name="age"
              label="Age"
              required
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              value={rest.age || ''}
              fullWidth
              sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}
              error={!!validationErrors.age}
              helperText={validationErrors.age}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="vacdate-label">Vaccinated Date</InputLabel>
            <TextField
              id="vacdate"
              name="vacdate"
              type="date"
              required
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              value={(rest.vacdate ? new Date(rest.vacdate).toISOString().split('T')[0] : '')}
              fullWidth
              sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}
              inputProps={{
                min: minDate,
                max: currentDate,
              }}
              error={!!validationErrors.vacdate}
              helperText={validationErrors.vacdate}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="nextdate-label">Next Date</InputLabel>
            <TextField
              id="nextdate"
              name="nextdate"
              type="date"
              required
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              value={(rest.nextdate ? new Date(rest.nextdate).toISOString().split('T')[0] : '')}
              fullWidth
              sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}
              inputProps={{
                min: currentDate,
              }}
              error={!!validationErrors.nextdate}
              helperText={validationErrors.nextdate}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2, borderRadius: 2 }}>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default vaccineAnimForm;
