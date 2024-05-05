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
import BgCards from "../../components/Employees/bgcards";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TableCard from '../../components/Employees/tablecards';
import axios from 'axios';
import Esidebar from "../../components/Employees/esidebar";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField'; // Import TextField component
import SearchIcon from '@mui/icons-material/Search'; // Import SearchIcon
import DateV from '../../components/Veterinary/DateV';
function Task() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const [showAll, setShowAll] = useState(false); 
    const [searchTerm, setSearchTerm] = useState(''); // State variable for search term
    const [dataList, setDataList] = useState([]); // State variable for task data
    
    useEffect(() => {
        axios.get("http://localhost:3000/api/employee/task")
        .then(result => {
            console.log(result.data);
            // Set the dataList state with the fetched data
            setDataList(result.data);
            setLoading(false); // Set loading to false when data is fetched
        })
        .catch(err => {
            console.log(err);
            setLoading(false); 
            // Set loading to false on error as well
        });
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
        
    const headers = [
        "Task ID",
        "Task",
        "Employee ID",
        "Employee Name",
        "Description",
        "Status",
        "Action",
    ];

    const filterTasksByStatus = (status) => {
        return dataList.filter(task => task.status === status);
    };

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
    
        // Save the updated task status to localStorage
        localStorage.setItem(`task_${taskID}_status`, newStatus);
        
        // Show notification
        toast.info(`Task completed ${employeeId}`);

        // Update task status in the backend
        axios.put(`http://localhost:3000/api/employee/updateTaskStatus/${taskID}`, { status: newStatus })
        .then(res => {
            console.log(res.data);
            // Show notification
            toast.info(`Task completed ${employeeId}`);
        })
        .catch(err => console.log(err));
    };

    const handleSeeMore = () => {
        navigate('/allTask');
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
        <div style={{ display: 'flex', minWidth: '1036px' }}>
   <Esidebar/>
        <Box sx={{ marginLeft: '12rem', marginTop:'50px', marginRight: '0rem',width: '86%' }}>
        <Typography variant="h4" sx={{ marginLeft: '1rem', fontSize: '14px', fontWeight: 'bold' ,fontFamily: 'Poppins'}}>
                    Welcome Back,
                </Typography>
                <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '30px', fontWeight: 'bold' ,fontFamily: 'Poppins'}}>
                   Hello Disara,
                </Typography>
                <DateV/>
            <Box sx={{ display: 'fixed' ,width:'100px',marginLeft: '-10rem',marginTop:'10px'}}>
                <BgCards>
                    <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'Poppins' }}>
                        All Tasks
                        <IconButton size="small" color="inherit">
                            <AssignmentIcon />
                        </IconButton>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '18px', fontFamily: 'Poppins' , marginLeft:'2rem'}}>
                        {dataList.length}
                    </Typography>
                </BgCards>
                <BgCards>
                    <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'Poppins' }}>
                        In Progress Tasks
                        <IconButton size="small" color="inherit">
                            <AssignmentIcon />
                        </IconButton>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '18px', fontFamily: 'Poppins' , marginLeft:'2rem'}}>
                        {filterTasksByStatus('In progress').length}
                    </Typography>
                </BgCards>
                <BgCards>
                    <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'Poppins' }}>
                        Completed Tasks
                        <IconButton size="small" color="inherit" >
                            <AssignmentIcon />
                        </IconButton>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '20px', fontFamily: 'Poppins', marginLeft:'2rem' }}>
                        {filterTasksByStatus('Completed').length}
                    </Typography>
                </BgCards>
            </Box>

            <TableCard>
                <Button variant="contained" color="success" onClick={handleClick} sx={{ marginBottom:'1rem',marginTop: '0rem', marginLeft: '70rem' }}>
                    Add New
                </Button>
                
                <div style={{ width: '100%',marginTop:'-55px',marginLeft:'-10rem' }}>
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
                <Typography variant="h5" sx={{ marginLeft: '5rem', fontSize: '20px' , fontWeight: 'bold'}}>
                    Tasks
                </Typography>
                {/* Table header and buttons */}
                <div style={{ width: '100%',marginTop:'10px' }}>
                <CustomizedTables
                   headers={headers}
                   rows={filteredTasks.length > 0 ? filteredTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(task => ({
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
                    style={{ width: '100%' }}
                />
                <TablePagination
                    rowsPerPageOptions={[2, 5, 10]}
                    component="div"
                    count={filteredTasks.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    nextIconButtonProps={{
                        onClick: () => handleChangePage(null, page + 1),
                        disabled: page >= Math.ceil(filteredTasks.length / rowsPerPage) - 1,
                    }}
                    backIconButtonProps={{
                        onClick: () => handleChangePage(null, page - 1),
                        disabled: page === 0,
                    }}
                />
                {!showAll && (
                    <Box sx={{ position: 'relative', marginTop: '2rem', textAlign: 'center' ,marginRight:'5rem'}}>
                    <Button
                       
                        onClick={handleSeeMore}
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            backgroundColor: 'transparent',
           
            border: 'none', // Remove the border
                        }}
                    >
                        <span style={{ color: 'blue' }}>See More</span><ArrowForwardIcon style={{ color: 'blue' }} />
                    </Button>
                </Box>
                
                
                )}
                </div>
            </TableCard>
            {/* Notification container */}
            <ToastContainer />
        </Box>
        </div>
                </div>
    );
}

export default Task;
