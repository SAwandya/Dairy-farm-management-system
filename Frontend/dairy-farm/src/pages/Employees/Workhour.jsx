import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomizedTables from '../components/table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; 
import { Box, Typography, TablePagination } from '@mui/material';
import BgCards from "../components/bgcards";
import AssignmentIcon from '@mui/icons-material/Assignment';
import TableCard from '../../components/Employees/tablecards';
import Esidebar from "../../components/Employees/esidebar";
import axios from 'axios';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Workhour() {
    const [workHours, setWorkHours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const [showAll, setShowAll] = useState(false); 

    useEffect(() => {
        // Fetch data from the server
        axios.get("http://localhost:5000/workhour")
            .then(result => {
                console.log(result.data);
                const updatedWorkHours = result.data.map(workhour => ({
                    ...workhour,
                    wage: calculateWage(workhour.OTWorkHours) // Call the calculateWage function
                }));
                setWorkHours(updatedWorkHours);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false); 
            });

        // Initialize static data
        const staticData = [
            {
                workID: 1,
                employeeId: "EMP001",
                employeeName: "John Doe",
                startTime: "08:00 AM",
                endTime: "05:00 PM",
                doneWork: "6 hours",
                scheduledWork: "8 hours",
                remainingWork: "2 hours",
                OTWorkHours: "2 hours",
                
            },
            {
                workID: 2,
                employeeId: "EMP002",
                employeeName: "Jane Smith",
                startTime: "09:00 AM",
                endTime: "06:00 PM",
                doneWork: "7 hours",
                scheduledWork: "8 hours",
                remainingWork: "1 hour",
                OTWorkHours: "1 hour",
            },
        ];

        setWorkHours(staticData);
        setLoading(false);
    }, []);
     
    const navigate = useNavigate(); // Initialize the navigate function here

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Function to calculate wage based on OT work hours
    const calculateWage = (OTWorkHours) => {
     
        return OTWorkHours * 1000; // Calculate wage
    };
        
    const headers = [
        "Work ID",
        "Employee ID",
        "Employee Name",
        "Avg.Scheduled Work",
        "Remaining Work",
        "OT Work Hours for week",
        "Wage",
        "Action",
    ];

    const handleEdit = (workID) => {
        navigate(`/pages/updateWorkhour/${workID}`);
    };

    const handleDelete = (workID) => {
        axios.delete(`http://localhost:5000/deleteWorkhour/${workID}`)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    const handleClick = () => {
        navigate('/pages/createWorkhour');
    };

    const handleSeeMore = () => {
        navigate('/pages/allWorkhour');
    };

    return (
        <Box sx={{ marginLeft: '12rem', marginTop:'50px' }}>
        <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '32px', fontWeight: 'bold' }}>
            Welcome Disara,
        </Typography>
        <Box sx={{ display: 'fixed' ,width:'100px',marginLeft: '-15rem',marginTop:'10px'}}>
            <BgCards>
                <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'Poppins' }}>
                    Total hours
                    <IconButton size="small" color="inherit">
                        <AssignmentIcon />
                    </IconButton>
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '16px', fontFamily: 'Poppins' }}>
                   10
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
                  10
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
                   10
                </Typography>
            </BgCards>
        </Box>
        <Box
      sx={{
        width: 500,
        height: 100,
        backgroundColor: 'lightgray',
        padding: 2,
        textAlign: 'center',
        marginTop:'2rem',
        borderRadius:'15px'
      }}
    >
        <Typography variant="h5" sx={{ marginLeft: '0rem', fontSize: '18px' , fontWeight: 'bold'}}>
                   Leave Evalution Details
                </Typography>
     
                <Button variant="contained" sx={{ mt: 2, borderRadius: 4, borderColor: 'red', }}>Show</Button>
    </Box>
       
            <TableCard>
                <Button variant="contained" color="success" onClick={handleClick} sx={{ marginBottom:'1rem',marginTop: '1rem', marginLeft: '62rem' }}>
                    Add New
                </Button>
                <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '18px' , fontWeight: 'bold'}}>
                    Work Hours
                </Typography>
                {/* Table header and buttons */}
                <CustomizedTables
                    headers={headers}
                    rows={workHours.length > 0 ? workHours.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(workhour => ({
                            "Work ID": workhour.workID,
                            "Employee ID": workhour.employeeId,
                            "Employee Name": workhour.employeeName,
                    
                            "Scheduled Work": workhour.scheduledWork,
                            "Remaining Work": workhour.remainingWork,
                            "OT Work Hours": workhour.OTWorkHours,
                            "Wage": calculateWage(workhour),
                            "Action": (
                                <div>
                                    <IconButton onClick={() => handleEdit(workhour.workID)} style={{ color: 'blue' }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(workhour.workID)} style={{ color: 'red' }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            )
                        })) : [{ "No Data": "No Data" }]}
                />
                <TablePagination
                    rowsPerPageOptions={[1,2]}
                    component="div"
                    count={workHours.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    nextIconButtonProps={{
                        onClick: () => handleChangePage(null, page + 1),
                        disabled: page >= Math.ceil(workHours.length / rowsPerPage) - 1,
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
                                border: 'none',
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
    );
}

export default Workhour;
