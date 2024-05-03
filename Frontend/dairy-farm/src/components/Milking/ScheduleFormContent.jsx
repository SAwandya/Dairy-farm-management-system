import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const ScheduleFormContent = () => {
    const [date, setDate] = useState('');
    const [dateError, setDateError] = useState('');
    const [time, setTime] = useState('');
    const [timeError, setTimeError] = useState('');
    const [cowGroup, setCowGroup] = useState('');
    const [cowGroupError, setCowGroupError] = useState('');
    const [specialNotes, setSpecialNotes] = useState('');
    const [specialNotesError, setSpecialNotesError] = useState('');
    const [batchOptions, setBatchOptions] = useState([]);
    const [status, setStatus] = useState('Incomplete');
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

    const displaySuccessToast = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 2800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
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
            displaySuccessToast('Successfully added!');
            setTimeout(() => {
                navigate('/milkingSessions');
            }, 3000);
        })
        .catch(err => console.log(err));
    };

    const isFormValid = () => {
        return !dateError && !timeError && !cowGroupError && !specialNotesError;
    };

    const validateDate = (value) => {
        if (!value) {
            setDateError('Date is required');
        } else if (!isValidDate(value)) {
            setDateError('Invalid date format');
        } else {
            setDateError('');
        }
    };

    const isValidDate = (value) => {
        const pattern = /^\d{4}-\d{2}-\d{2}$/;
        return pattern.test(value);
    };

    const handleDateChange = (value) => {
        setDate(value);
        validateDate(value);
    
        const enteredDate = new Date(value);
        const today = new Date();
        today.setDate(today.getDate() - 1); 
        if (enteredDate < today) {
            setDateError('Date cannot be before today');
        } else {
            setDateError('');
        }
    };
    

    const validateTime = (value) => {
        if (!value) {
            setTimeError('Time is required');
        } else {
            setTimeError('');
        }
    };

    const handleTimeChange = (value) => {
        setTime(value);
        validateTime(value);
    };

    const validateCowGroup = (value) => {
        if (!value) {
            setCowGroupError('Cow Group is required');
        } else {
            setCowGroupError('');
        }
    };

    const handleCowGroupChange = (value) => {
        setCowGroup(value);
        validateCowGroup(value);
    };

    const validateSpecialNotes = (value) => {
        if (!value) {
            setSpecialNotesError('Special Notes are required');
        } else {
            setSpecialNotesError('');
        }
    };

    const handleSpecialNotesChange = (value) => {
        setSpecialNotes(value);
        validateSpecialNotes(value);
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
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                min: new Date().toISOString().split('T')[0]
                            }}
                            value={date}
                            onChange={(e) => handleDateChange(e.target.value)}
                            fullWidth
                            required
                            error={!!dateError}
                            helperText={dateError}
                            style={{
                                marginBottom: '16px'
                            }}
                        />
                        <TextField
                            name="time"
                            label="Time"
                            type="time"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={time}
                            onChange={(e) => handleTimeChange(e.target.value)}
                            fullWidth
                            required
                            error={!!timeError}
                            helperText={timeError}
                            style={{
                                marginBottom: '16px'
                            }}
                        />
                        <Select
                            name="cowGroup"
                            label="Cow Group"
                            value={cowGroup}
                            onChange={(e) => handleCowGroupChange(e.target.value)}
                            fullWidth
                            required
                            error={!!cowGroupError}
                            helperText={cowGroupError}
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
                            onChange={(e) => handleSpecialNotesChange(e.target.value)}
                            fullWidth
                            multiline
                            rows={6}
                            error={!!specialNotesError}
                            helperText={specialNotesError}
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
