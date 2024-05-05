import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomizedTables from '../../components/Employees/etable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; 
import { Box, Typography, TablePagination } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TableCard from '../../components/Employees/tablecards';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import Esidebar from "../../components/Employees/esidebar";
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField'; // Import TextField component
import SearchIcon from '@mui/icons-material/Search'; // Import SearchIcon
import DateV from '../../components/Veterinary/DateV';
function Task() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState(''); // State variable for search term
    
    useEffect(() => {
        axios.get("http://localhost:3000/api/employee/task")
        .then(result => {
            console.log(result.data);
            // Set the dataList state with the fetched data
            const sortedData = result.data.sort((a, b) => a.taskID.localeCompare(b.taskID));
            setDataList(sortedData);
            setLoading(false); // Set loading to false when data is fetched
        })
        .catch(err => {
            console.log(err);
            setLoading(false); // Set loading to false on error as well
        });
    }, []);
    const [dataList, setDataList] = useState([
        {
        },
        {
          
        },
    ]);
    
    
        
    const headers = [
        "Task ID",
        "Task",
        "Employee ID",
        "Employee Name",
        "Description",
        "Status",
        "Action",
    ];

   
    const handleEdit = (id) => {
        navigate(`/updateTask/${id}`);
    };

   

    const handleDelete = (id) => {
        // Show confirmation box
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // If user confirms deletion, send delete request
                axios.delete(`http://localhost:3000/api/employee/deleteTask/${id}`)
                    .then(res => {
                        console.log(res);
                        // Update the dataList state to remove the deleted task
                        setDataList(prevDataList => prevDataList.filter(task => task._id !== id));
                        // Show success toast upon successful deletion
                        toast.success('Task deleted successfully', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined
                        });
                    })
                    .catch(err => console.log(err));
            }
        });
    };
    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/createTask');
    };

    const handleStatusChange = (taskID, newStatus, employeeId) => {
        const updatedDataList = dataList.map(task => {
            if (task.taskID === taskID) {
                return { ...task, status: newStatus };
            }
            return task;
        });
        setDataList(updatedDataList);
        // Show notification
        toast.info(`Task completed ${employeeId}`);
    };
    // Filter tasks based on search term
    const filteredTasks = dataList.filter(task => 
        (task.taskinfo && task.taskinfo.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (task.employeeName && task.employeeName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (task.status && task.status.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    
    
    return (
        <div>
        <div style={{ display: 'flex', minWidth: '1036px',overflow: 'hidden'  }}>
   <Esidebar/>
        
        <Box sx={{ marginLeft: '12rem', marginTop:'20px' }}>
        <Typography variant="h4" sx={{ marginLeft: '1rem', fontSize: '14px', fontWeight: 'bold' ,fontFamily: 'Poppins'}}>
                    Welcome Back,
                </Typography>
                <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '30px', fontWeight: 'bold' ,fontFamily: 'Poppins'}}>
                   Hello Disara,
                </Typography>
                <DateV/>
                <div style={{ width: '100%',marginTop:'20px',marginLeft:'1rem' }}>
                        <TextField
                            onChange={(event) => {
                                console.log("Search Term:", event.target.value); 
                                setSearchTerm(event.target.value);
                            }}
                            placeholder="Search..."
                            InputProps={{
                                startAdornment: (
                                    <SearchIcon />
                                ),
                                style: { marginBottom: '10px', width: '250px' ,borderRadius: '20px ', marginLeft: '1000px'}
                            }}
                        />
                    </div>
            <Box
    sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        padding: '1rem',
        zIndex: 999,
    }}
>
    <IconButton onClick={() => navigate('/task')} color="inherit">
        <CloseIcon />
    </IconButton>
</Box>


            <TableCard>
                <Button variant="contained" color="success" onClick={handleClick} sx={{ marginBottom:'1rem',marginTop: '1rem', marginLeft: '62rem' }}>
                    Add New
                </Button>
              
                <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '18px' , fontWeight: 'bold'}}>
                    Tasks
                </Typography>
                {/* Table header and buttons */}
                <CustomizedTables
                    headers={headers}
                    rows={filteredTasks.length > 0 ? filteredTasks.slice().map(task => ({
                        "Task ID": task.taskID,
                        "Task": task.taskinfo,
                        "Employee ID": task.employeeId,
                        "Employee Name": task.employeeName,
                        "Description": task.description,
                        "Status": task.status,
                        "Action": (
                            <div>
                                {task.status !== "Completed" && (
                                    <IconButton onClick={() => handleStatusChange(task.taskID, "Completed", task.employeeId)} style={{ color: 'green' }}>
                                        <AssignmentIcon />
                                    </IconButton>
                                )}
                                <IconButton onClick={() => handleEdit(task._id)} style={{ color: 'blue' }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(task._id)} style={{ color: 'red' }}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        )
                    })) : [{ "No Data": "No Data" }]}
                />
                
            </TableCard>

            {/* Notification container */}
            <ToastContainer />
        </Box>
        </div>
        </div>
    );
}

export default Task;
