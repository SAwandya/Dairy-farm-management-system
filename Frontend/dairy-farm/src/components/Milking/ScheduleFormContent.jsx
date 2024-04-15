import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ScheduleFormContent = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [cowGroup, setCowGroup] = useState('');
    const [status, setStatus] = useState('Incomplete');
    const [specialNotes, setSpecialNotes] = useState('');
    const [batchOptions, setBatchOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBatchOptions();
    }, []);

    const fetchBatchOptions = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/animalReg/batches');
            if (response.data.success) {
                setBatchOptions(response.data.data);
            } else {
                console.error('Failed to fetch batch options:', response.data.error);
            }
        } catch (error) {
            console.error('Error fetching batch options:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        axios.post("http://localhost:3000/api/milkingSessions", {
            date,
            time,
            cowGroup,
            status,
            specialNotes
        })
        .then(result => {
            // console.log(result);
            navigate('/milkingSessions');
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
                <img src='../../../src/assets/schedule-form-bg.png' width={'45%'}/>
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
                        Scheduling Form
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="date"
                            label="Date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            fullWidth
                            required
                            style={{
                                marginBottom: '16px'
                            }}
                        />
                        <TextField
                            name="time"
                            label="Time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            fullWidth
                            required
                            style={{
                                marginBottom: '16px'
                            }}
                        />
                        <Select
                            name="cowGroup"
                            label="Cow Group"
                            value={cowGroup}
                            onChange={(e) => setCowGroup(e.target.value)}
                            fullWidth
                            required
                            displayEmpty
                            style={{
                                marginBottom: '16px'
                            }}
                        >
                            <MenuItem value="" disabled>
                                Select Cow Group
                            </MenuItem>
                            {batchOptions.map((batch) => (
                                <MenuItem key={batch} value={batch}>
                                    {batch}
                                </MenuItem>
                            ))}
                        </Select>
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
                            Add Milk Session
                        </Button>
                    </form>
                </Box>
            </Box>
        </Box>
    );
}

export default ScheduleFormContent;
