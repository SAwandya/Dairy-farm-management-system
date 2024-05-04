import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { Button, TextField, Grid, Container } from '@mui/material';

const AIForm = ({ cow, handleClose, handleSubmit, rest, handleOnChange }) => {
    const [validationError, setValidationError] = useState('');

    const handleChange = (e) => {
        const { value, name } = e.target;
        handleOnChange({ ...rest, [name]: value });
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
            <h3>{`Set AI for ${cow.name}`}</h3>

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
                        <TextField
                            label="Male Cow ID"
                            name="maleCowMateId"
                            id="maleCowMateId"
                            value={rest.maleCowMateId}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Date of Mate"
                            name="dateOfMate"
                            id="dateOfMate"
                            type="date"
                            value={rest.dateOfMate}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    {validationError && <span style={{ color: 'red' }}>{validationError}</span>}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2, borderRadius: 2 }}>Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default AIForm;
