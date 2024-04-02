import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomizedTables from '../../components/Veterinary/table';
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



function Task() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const [showAll, setShowAll] = useState(false); 
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

    const [dataList, setDataList] = useState([
        {
        },
        {
          
        },
    ]);

    const filterTasksByStatus = (status) => {
        return dataList.filter(task => task.status === status);
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        // Add the new user to the state
        setTasks((prevTasks) => [...prevTasks, newTask]);
        // Clear the form fields
        e.target.reset();
    };

    const handleEdit = (id) => {
        navigate(`/pages/updateTask/${id}`);
    };

    const handleDelete = (id) => {
        axios.delete('http://localhost:5000/deleteTask/'+id)
        .then(res => {
            console.log(res);
            window.location.reload();
        })
        .catch(err => console.log(err));
    };

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/pages/createTask');
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
        axios.put(`http://localhost:5000/updateTaskStatus/${taskID}`, { status: newStatus })
        .then(res => {
            console.log(res.data);
            // Show notification
            toast.info(`Task completed ${employeeId}`);
        })
        .catch(err => console.log(err));
    };

    const handleSeeMore = () => {
        navigate('/pages/allTask');
    };

    return (
        <div>
        <div style={{ display: 'flex', minWidth: '1036px' }}>
   <Esidebar/>
        <Box sx={{ marginLeft: '12rem', marginTop:'50px' }}>
            <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '32px', fontWeight: 'bold' }}>
                Welcome Disara,
            </Typography>
            <Box sx={{ display: 'fixed' ,width:'100px',marginLeft: '-15rem',marginTop:'10px'}}>
                <BgCards>
                    <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'Poppins' }}>
                        All Tasks
                        <IconButton size="small" color="inherit">
                            <AssignmentIcon />
                        </IconButton>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '16px', fontFamily: 'Poppins' }}>
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
                    <Typography variant="body1" sx={{ fontSize: '16px', fontFamily: 'Poppins' }}>
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
                    <Typography variant="body1" sx={{ fontSize: '16px', fontFamily: 'Poppins' }}>
                        {filterTasksByStatus('Completed').length}
                    </Typography>
                </BgCards>
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
                   rows={dataList.length > 0 ? dataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(task => ({
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
                <TablePagination
                    rowsPerPageOptions={[2, 5, 10]}
                    component="div"
                    count={dataList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    nextIconButtonProps={{
                        onClick: () => handleChangePage(null, page + 1),
                        disabled: page >= Math.ceil(dataList.length / rowsPerPage) - 1,
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
            </TableCard>
            {/* Notification container */}
            <ToastContainer />
        </Box>
        </div>
                </div>
    );
}

export default Task;

