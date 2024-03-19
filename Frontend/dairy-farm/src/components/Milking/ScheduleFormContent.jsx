import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ScheduleFormContent = () => {
    const [sessionId, setSessionId] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [cowGroup, setCowGroup] = useState('');
    const [status, setStatus] = useState('Incomplete');
    const [specialNotes, setSpecialNotes] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        axios.post("http://localhost:3000/api/milkingSessionRoute", {
            sessionId,
            date,
            time,
            cowGroup,
            status,
            specialNotes
        })
        .then(result => {
            // console.log(result);
            // navigate('/milkingdashboard');
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
                            fontSize: '42px'
                        }}
                    >
                        Scheduling Form
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="sessionId"
                            label="Session ID"
                            type="number"
                            value={sessionId}
                            onChange={(e) => setSessionId(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            name="date"
                            label="Date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            name="time"
                            label="Time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            name="cowGroup"
                            label="Cow Group"
                            value={cowGroup}
                            onChange={(e) => setCowGroup(e.target.value)}
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
                            Add Milk Session
                        </Button>
                    </form>
                </Box>
            </Box>
        </Box>
    );
}

export default ScheduleFormContent;
