import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Container, FormHelperText } from '@mui/material';

const ExamineAnimForm = ({ handleSubmit, handleOnChange, handleClose, rest }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const initialExam = rest.exam || '';
  const [exam, setExam] = useState(initialExam);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExam(name === 'exam' ? value : exam);
    handleOnChange(e);
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errors = { ...validationErrors };
    
    // Check for required fields
    if (name === 'earTag' && !value) {
      errors.earTag = 'Ear Tag ID is required.';
    } else {
      delete errors.earTag;
    }
    
    if (name === 'currentStatus' && !value) {
      errors.currentStatus = 'Current Status is required.';
    } else {
      delete errors.currentStatus;
    }
    
    if (name === 'exam' && !value) {
      errors.exam = 'Exam type is required.';
    } else {
      delete errors.exam;
    }
    //date validation
    if (name === 'checkdate') {
      const currentDate = new Date();
      const inputDate = new Date(value);
      const fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(currentDate.getDate() - 14);

      if (!value || inputDate > currentDate || inputDate < fiveDaysAgo) {
        errors.checkdate = 'Exam date must be today or within the past 14 days.';
      } else {
        delete errors.checkdate;
      }
    }

    setValidationErrors(errors);
  };

  const validateForm = () => {
    let isValid = true;

    // Validate each required field
    ['earTag', 'currentStatus', 'exam', 'checkdate'].forEach((field) => {
      if (!rest[field] && (field !== 'exam' || exam)) {
        isValid = false;
        validateField(field, rest[field]);
      }
    });

    return isValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = {
        ...rest,
        exam: exam
      };
      console.log("Form Data:", formData);
      handleSubmit(formData);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something Went Wrong!'
      });
    }
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
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
      <CloseIcon
        sx={{ position: 'absolute', top: 22, right: 22, cursor: 'pointer' }}
        onClick={handleClose}
      />
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={3} sx={{ marginTop: '20px' }}>
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
              sx={{ borderRadius: 2 }}
              error={!!validationErrors.earTag}
              helperText={validationErrors.earTag}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="currentStatus"
              name="currentStatus"
              label="Current Status"
              required
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              value={rest.currentStatus || ''}
              fullWidth
              sx={{ borderRadius: 2 }}
              error={!!validationErrors.currentStatus}
              helperText={validationErrors.currentStatus}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth sx={{ borderRadius: 2 }}>
              <InputLabel id="exam-label">Exam</InputLabel>
              <Select
                labelId="exam-label"
                id="exam"
                name="exam"
                value={exam}
                label="Exam"
                onChange={handleChange}
                onBlur={handleOnBlur}
                required
                fullWidth
                error={!!validationErrors.exam}
              >
                <MenuItem value={'Pregnancy Check'}>Pregnancy Check</MenuItem>
                <MenuItem value={'Dry Off Examination'}>Dry Off Examination</MenuItem>
                <MenuItem value={'General'}>General</MenuItem>
                <MenuItem value={'Disease Check'}>Disease Check</MenuItem>
              </Select>
              <FormHelperText error={!!validationErrors.exam}>{validationErrors.exam}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
                labelId="checkdate"
                id="checkdate"
                name="checkdate"
                type="date"
                label="Exam Date"
                required
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                value={(rest.checkdate ? rest.checkdate : '')}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    min: new Date(new Date().setDate(new Date().getDate() - 14)).toISOString().split('T')[0], // Two weeks ago as the minimum date
                    max: new Date().toISOString().split('T')[0], // Today's date as the maximum date
                }}
                sx={{ borderRadius: 2 }}
                error={!!validationErrors.checkdate}
                helperText={validationErrors.checkdate}
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

export default ExamineAnimForm;
