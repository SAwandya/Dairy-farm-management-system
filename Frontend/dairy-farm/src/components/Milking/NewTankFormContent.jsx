import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const NewTankFormContent = () => {
    const [capacity, setCapacity] = useState('');
    const [installedDate, setInstalledDate] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [specialNotes, setSpecialNotes] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'capacity' && value < 0) {
            setErrors({ ...errors, [name]: 'Capacity cannot be negative' });
        } else {
            setErrors({ ...errors, [name]: value ? '' : `${name} is required` });
        }

        switch (name) {
            case 'capacity':
                setCapacity(value);
                break;
            case 'installedDate':
                setInstalledDate(value);
                break;
            case 'manufacturer':
                setManufacturer(value);
                break;
            case 'specialNotes':
                setSpecialNotes(value);
                break;
            default:
                break;
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

    const displayErrorToast = (message) => {
        toast.error(message, {
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

        if (Object.values(errors).some((error) => error)) {
            return;
        }

        axios.post("http://localhost:3000/api/milkingStorage", {
            capacity,
            installedDate,
            manufacturer,
            specialNotes
        })
        .then(result => {
            displaySuccessToast("Tank successfully added!")
            setTimeout(() => {
                navigate('/milkingStorage');
            }, 3000);
        })
        .catch(err => {
            console.log(err);
            displayErrorToast('Something went wrong!');
        });
        
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
                <img src='../../../src/assets/tank-form-bg.png' width={'45%'} alt="Tank Background" />
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
                            onChange={handleChange}
                            fullWidth
                            required
                            error={!!errors.capacity}
                            helperText={errors.capacity}
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
                            onChange={handleChange}
                            fullWidth
                            required
                            error={!!errors.installedDate}
                            helperText={errors.installedDate}
                            style={{
                                marginBottom: '16px'
                            }}
                        />
                        <TextField
                            name="manufacturer"
                            label="Manufacturer"
                            value={manufacturer}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={!!errors.manufacturer}
                            helperText={errors.manufacturer}
                            style={{
                                marginBottom: '16px'
                            }}
                        />
                        <TextField
                            name="specialNotes"
                            label="Special Notes"
                            value={specialNotes}
                            onChange={handleChange}
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
