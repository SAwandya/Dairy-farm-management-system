import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import { fontFamily } from '@mui/system';

const ScheduleFormContent = () => {

    const [session, setSession] = useState({
        date: '',
        time: '',
        cowGroup: '',
        status: '',
        specialNotes: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSession({ ...session, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', session);
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
                            name="date"
                            label="Date"
                            type="date"
                            value={session.date}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            name="time"
                            label="Time"
                            type="time"
                            value={session.time}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            name="cowGroup"
                            label="Cow Group"
                            value={session.cowGroup}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Status</InputLabel>
                            <Select
                                name="status"
                                value={session.status}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="Completed">Completed</MenuItem>
                                <MenuItem value="Incomplete">Incomplete</MenuItem>
                                <MenuItem value="Cancelled">Cancelled</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            name="specialNotes"
                            label="Special Notes"
                            value={session.specialNotes}
                            onChange={handleChange}
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
