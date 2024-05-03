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
    
        axios.post("http://localhost:3000/api/milkingStorage", {
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
                            fontSize: '42px',
                            marginBottom: '36px'
                        }}
                    >
                        Add a New Tank
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="capacity"
                            label="Capacity"
                            type="number"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            fullWidth
                            required
                            style={{
                                marginBottom: '16px'
                            }}
                        />
                        <TextField
                            name="installedDate"
                            label="Installed Date"
                            type="date"
                            value={installedDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => setInstalledDate(e.target.value)}
                            fullWidth
                            required
                            style={{
                                marginBottom: '16px'
                            }}
                        />
                        <TextField
                            name="manufacturer"
                            label="Manufacturer"
                            value={manufacturer}
                            onChange={(e) => setManufacturer(e.target.value)}
                            fullWidth
                            required
                            style={{
                                marginBottom: '16px'
                            }}
                        />
                        <TextField
                            name="specialNotes"
                            label="Special Notes"
                            value={specialNotes}
                            onChange={(e) => setSpecialNotes(e.target.value)}
                            fullWidth
                            multiline
                            rows={6}
                            style={{
                                marginBottom: '48px'
                            }}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth
                            style={{
                                backgroundColor: '#38775B',
                                color: '#fff',
                                width: '100%',
                                fontFamily: 'Poppins, sans-serif',
                                textTransform: 'none',
                                fontWeight: '600',
                                fontSize: '18px',
                                marginBottom: '22px',
                                borderRadius: '15px'
                            }} 
                        >
                            Add Tank
                        </Button>
                    </form>
                </Box>
            </Box>
        </Box>
    );
}

export default NewTankFormContent;
