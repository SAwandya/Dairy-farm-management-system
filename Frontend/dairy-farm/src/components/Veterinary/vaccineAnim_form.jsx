import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Container } from '@mui/material';


const vaccineAnimForm = ({ handleSubmit, handleOnChange, handleClose, rest }) => {
  const [validationError, setValidationError] = useState('');
  const initialVaccine = rest.vaccine || ''; 
  const [vaccine, setVaccine] = useState(initialVaccine);

  const handleChange = (e) => {
    if (e && e.target && e.target.value) {

      setVaccine(e.target.value);

      handleOnChange(e); 
    }
  };

  const validateForm = () => {
    const currentDate = new Date();
    const selectedDate = new Date(rest.vacdate);
    const nextDate = new Date(rest.nextdate);
    if (!vaccine) {
      setValidationError('Vaccine is required.');
      return false;
    }
    
    if (selectedDate > currentDate) {
      setValidationError('Vaccinated date must be a date before today.');
      return false;
    }
    if (nextDate < currentDate) {
      setValidationError('Next date must be a date after today.');
      return false;
    }
    if (nextDate <= selectedDate) {
      setValidationError('Next date must be after the vaccinated date.');
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
        vaccine: vaccine 
      };
      console.log("Form Data:", formData); 
      handleSubmit(formData);
      
      
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
      marginTop:'100px',
    }}>
      <CloseIcon sx={{ position: 'absolute', top: 22, right: 22, cursor: 'pointer' }} onClick={handleClose} />
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField id="earTag" name="earTag" label="Ear Tag ID" required onChange={handleOnChange} value={rest.earTag || ''} fullWidth sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }} />
          </Grid>
          <Grid item xs={6}>
            <TextField id="status" name="status" label="Status" required onChange={handleOnChange} value={rest.status || ''} fullWidth sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }} />
          </Grid>
         
          <Grid item xs={6}>
            <FormControl fullWidth sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}>
              <InputLabel id="vaccine">Vaccine</InputLabel>
              <Select
                labelId="vaccine"
                id="vaccine"
                value={vaccine}
                label="vaccine"
                onChange={handleChange} 
                required
              >
                <MenuItem value={'Rabbies'}>Rabbies</MenuItem>
                <MenuItem value={'LHD'}>LHD</MenuItem>
                <MenuItem value={'FMD'}>FMD</MenuItem>
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={6}>
            <TextField id="age" name="age" label="Age" required onChange={handleOnChange} value={rest.age || ''} fullWidth sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }} />
          </Grid>
          <Grid item xs={6}>
          <InputLabel id="vacdate-label">Vaccinated Date</InputLabel>
            <TextField
              id="vacdate"
              name="vacdate"
              type="date"
              required
              onChange={handleOnChange}
              value={(rest.vacdate ? new Date(rest.vacdate).toISOString().split('T')[0] : '')}
              fullWidth
              sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
          <InputLabel id="vacdate-label">Next Date</InputLabel>
            <TextField
              id="nextdate"
              name="nextdate"
              type="date"
              required
              onChange={handleOnChange}
              value={(rest.nextdate ? new Date(rest.nextdate).toISOString().split('T')[0] : '')}
              fullWidth
              sx={{ width: 'calc(100% - 36px)', borderRadius: 2 }}
            />
          </Grid>
          {validationError && <span style={{ color: 'red' }}>{validationError}</span>}
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2, borderRadius: 2 }}>Submit</Button>
      </form>
    </Container>
  );
};

export default vaccineAnimForm;
