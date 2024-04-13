import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Container } from '@mui/material';

const PregnancyForm = ({ cow, handleClose, handleSubmit, rest, handleOnChange }) => {
    const [validationError, setValidationError] = useState('');
    const [isPregnant, setIsPregnant] = useState('');

    const handleChange = (e) => {
        if (e && e.target && e.target.value) {
            setIsPregnant(e.target.value);
            handleOnChange(e);
        }
    };

    const validateForm = () => {
        const currentDate = new Date();
        const selectedDate = new Date(rest.dateOfMate);
        const selectedDate2 = new Date(rest.calvingDate);

        if (selectedDate2 >= currentDate || selectedDate <= currentDate) {
            setValidationError('');
            return true;
        }

        setValidationError('Date is Invalid!');
        return false;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleSubmit(rest);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: validationError
            });
        }
    };

    return (
        <Container sx={{ backgroundColor: '#fff', padding: 3, borderRadius: 2, boxShadow: '0px 3px 15px rgba(0,0,0,0.2)', position: 'relative', marginTop: '100px', maxHeight: '500px' }}>
            <CloseIcon sx={{ position: 'absolute', top: 22, right: 22, cursor: 'pointer' }} onClick={handleClose} />
            <h3>{`Check Pregnancy for ${cow.name}`}</h3>

            <form onSubmit={handleFormSubmit}>
                <Grid container spacing={3} sx={{ marginTop: '20px' }}>
                <Grid item xs={12}>
                        <TextField
                            label="Animal Ear Tag"
                            name="earTag"
                            id="earTag"
                            value={cow.earTag}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="isPregnant-label">Is Pregnant</InputLabel>
                            <Select
                                labelId="isPregnant-label"
                                id="isPregnant"
                                label="Is Pregnant"
                                name="isPregnant"
                                value={isPregnant}
                                onChange={handleChange} 
                                fullWidth
                                required
                            >
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {isPregnant === 'yes' && (
                        <Grid item xs={12}>
                            <TextField
                                label="Calving Date"
                                name="calvingDate"
                                id="calvingDate"
                                type="date"
                                value={rest.calvingDate}
                                onChange={handleOnChange}
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    )}
                </Grid>
                {validationError && <span style={{ color: 'red' }}>{validationError}</span>}
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2, borderRadius: 2 }}>Submit</Button>
            </form>
        </Container>
    );
};

export default PregnancyForm;
