import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

function EditForm({ animal, handleUpdate, onCancel }) {
    const [editedAnimal, setEditedAnimal] = useState({ ...animal });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedAnimal(prevAnimal => ({
            ...prevAnimal,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate(editedAnimal);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Ear Tag"
                        name="earTag"
                        value={editedAnimal.earTag}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Current Status"
                        name="currentStatus"
                        value={editedAnimal.currentStatus}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Exam"
                        name="exam"
                        value={editedAnimal.exam}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Check Date"
                        name="checkdate"
                        type="date"
                        value={editedAnimal.checkdate}
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">Update</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default EditForm;
