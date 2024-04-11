import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const NewTankFormContent = () => {
    const [tankId, setTankId] = useState('');
    const [capacity, setCapacity] = useState('');
    const [installedDate, setInstalledDate] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [specialNotes, setSpecialNotes] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        axios.post("http://localhost:3000/api/storageTank", {
            tankId,
            capacity,
            installedDate,
            manufacturer,
            specialNotes
        })
        .then(result => {
            navigate('/milkingStorage');
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfuly added",
                showConfirmButton: false,
                timer: 1500
            });
        })
        .catch(err => console.log(err));
        
    };

    return (
        <Box className="dashboard-content">
            <Box
                sx={{
                    display: 'flex',
                    width: '82vw',
                    height: '86vh'
                }}
            >
                <img src='../../../src/assets/tank-form-bg.png' width={'45%'}/>
                <Box
                    width={'55%'}
                    sx={{
                        backgroundColor: '#fff',
                        padding: '30px',
                        borderTopRightRadius: '15px',
                        borderBottomRightRadius: '15px',
                    }}
                >
                    <Typography
                        variant='h3'
                        sx={{
                            fontFamily: 'Poppins',
                            fontWeight: '600',
                            textAlign: 'center',
                            fontSize: '42px'
                        }}
                    >
                        Add a New Tank
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="tankId"
                            label="Tank ID:"
                            type="number"
                            value={tankId}
                            onChange={(e) => setTankId(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            name="capacity"
                            label="Capacity"
                            type="number"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            name="installedDate"
                            label="Installed Date"
                            type="date"
                            value={installedDate}
                            onChange={(e) => setInstalledDate(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            name="manufacturer"
                            label="Manufacturer"
                            value={manufacturer}
                            onChange={(e) => setManufacturer(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            name="specialNotes"
                            label="Special Notes"
                            value={specialNotes}
                            onChange={(e) => setSpecialNotes(e.target.value)}
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Save
                        </Button>
                    </form>
                </Box>
            </Box>
        </Box>
    );
}

export default NewTankFormContent;
