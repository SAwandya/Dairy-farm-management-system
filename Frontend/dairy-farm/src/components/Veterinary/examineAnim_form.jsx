import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Container } from '@mui/material';

const ExamineAnimForm = ({ handleSubmit, handleOnChange, handleClose, rest }) => {
  const [validationError, setValidationError] = useState('');
  const initialExamine = rest.exam || '';
  const [exam, setExamine] = useState(initialExamine);

  const handleChange = (e) => {
    if (e && e.target && e.target.value) {
      setExamine(e.target.value);
      handleOnChange(e);
    }
  };

  const validateForm = () => {
    const currentDate = new Date();
    const selectedDate = new Date(rest.checkdate);
    if (!exam) {
      setValidationError('Examine type is required.');
      return false;
    }
    
    if (selectedDate.toDateString() < currentDate.toDateString()) {
      setValidationError('Examine date must not be today.');
      return false;
    }
    
    setValidationError('');
    return true;
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
        icon: "error",
        title: "Oops...",
        text: "Date is invalid!"
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
      marginTop: '100px',
    }}>
      <CloseIcon sx={{ position: 'absolute', top:22, right: 22, cursor: 'pointer' }} onClick={handleClose} />
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={3} sx={{ marginTop: '20px' }}>
          <Grid item xs={6}>
            <TextField id="earTag" name="earTag" label="Ear Tag ID" required onChange={handleOnChange} value={rest.earTag || ''} fullWidth sx={{ borderRadius: 2 }} />
          </Grid>
          <Grid item xs={6}>
            <TextField id="currentStatus" name="currentStatus" label="Current Status" required onChange={handleOnChange} value={rest.currentStatus || ''} fullWidth sx={{ borderRadius: 2 }} />
          </Grid>
         
          <Grid item xs={6}>
            <FormControl fullWidth sx={{ borderRadius: 2 }}>
              <InputLabel id="exam-label">Exam</InputLabel>
              <Select
                labelId="exam-label"
                id="exam"
                value={exam}
                label="Exam"
                onChange={handleChange} 
                required
                fullWidth
              >
                <MenuItem value={'Pregnancy Check'}>Pregnancy Check</MenuItem>
                <MenuItem value={'Dry Off Examination'}>Dry Off Examination</MenuItem>
                <MenuItem value={'General'}>General</MenuItem>
                <MenuItem value={'Disease Check'}>Disease Check</MenuItem>
              </Select>
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
              value={(rest.checkdate ? rest.checkdate : '')}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
          
          {validationError && <span style={{ color: 'red' }}>{validationError}</span>}
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2, borderRadius: 2 }}>Submit</Button>
      </form>
    </Container>
  );
};

export default ExamineAnimForm;
