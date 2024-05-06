import React, { useState, useEffect } from "react";
import CustomizedTables from '../../components/Employees/etable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; 
import { Box, Typography, TextField } from '@mui/material'; // Import TextField component
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TableCard from '../../components/Employees/tablecards';
import Esidebar from "../../components/Employees/esidebar";
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TablePagination from '@mui/material/TablePagination';
import SearchIcon from '@mui/icons-material/Search'; // Import SearchIcon
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import DateV from '../../components/Veterinary/DateV';
function AllEmployee() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const [showAll, setShowAll] = useState(false); 
    const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term
    
    useEffect(() => {
        axios.get("http://localhost:3000/api/employee/")
        .then(result => {
            console.log(result.data);
            const sortedData = result.data.sort((a, b) => a.employeeId.localeCompare(b.employeeId));
            setDataList(sortedData);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, []);
    
    const calculateTotalSalary = (employee) => {
      const epfRate = 0.08; // Assuming EPF rate is 8%
      const bonusRate = 0.1; // 10% bonus
  
      const basicSalary = employee.basicSalary || 0;
      const epfDeduction = basicSalary * epfRate;
      const bonus = basicSalary * bonusRate;
  
      return basicSalary - epfDeduction + bonus;
    };
  
    const [dataList, setDataList] = useState([{ }]);
  
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
  
    const handleEdit = (id) => {
        navigate(`/updateEmployee/${id}`);
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
                axios.delete(`http://localhost:3000/api/employee/deleteEmployee/${id}`)
                    .then(res => {
                        console.log(res);
                        // Show success toast upon successful deletion
                        toast.success('Employee deleted successfully', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            onClose: () => {
                                // Fetch updated employee list after deletion
                                axios.get("http://localhost:3000/api/employee/")
                                    .then(result => {
                                        console.log(result.data);
                                        // Update state with new list of employees
                                        setDataList(result.data);
                                    })
                                    .catch(err => console.log(err));
                            }
                        });
                    })
                    .catch(err => console.log(err));
            }
        });
    };
    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/createEmployee');
    };

    const headers = [
        "Employee ID",
        "Employee Name",
        "Position",
        "Contact Number",
        "Email",
        "Basic Salary",
        "Total Salary",
        "Action",
    ];

    // Filter the employee data based on the search term
    const filteredEmployees = dataList.filter(employee => 
        (employee.employeeName && employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (employee.position && employee.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (employee.contactNumber && employee.contactNumber.includes(searchTerm)) ||
        (employee.email && employee.email.toLowerCase().includes(searchTerm))
    );
    
    return (
        <div>
             <div>
    {/* Your app components */}
    <ToastContainer />
            <div style={{ display: 'flex', minWidth: '1036px', overflow: 'hidden' }}>
                <Esidebar/>
                <Box sx={{ marginLeft: '11rem', marginTop:'50px' }}>
                <Typography variant="h4" sx={{ marginLeft: '1rem', fontSize: '14px', fontWeight: 'bold' ,fontFamily: 'Poppins'}}>
                    Welcome Back,
                </Typography>
                <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '30px', fontWeight: 'bold' ,fontFamily: 'Poppins'}}>
                   Hello Disara,
                </Typography>
                <Box sx={{ marginLeft: '11rem',marginTop:'-60px' ,width:'86%' }}>
                <DateV/>
                </Box>
                    <Box sx={{ position: 'absolute', top: 0, right: 0, padding: '0rem', zIndex: 999 }}>
                        <IconButton onClick={() => navigate('/employeedashboard')} color="inherit">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {/* Search Bar */}
                    <div style={{ width: '100%',marginTop:'20px',marginLeft:'1rem' }}></div>
                    <TextField
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search..."
                        InputProps={{
                            startAdornment: (<SearchIcon />),
                            style: { marginBottom: '8px', width: '250px', borderRadius: '20px', marginLeft: '1000px' }
                        }}
                        variant="outlined"
                    />
                    
                    <TableCard>
                        <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '18px', fontWeight: 'bold' }}>
                            Employee
                        </Typography>
                        <Button variant="contained" color="success" onClick={handleClick} sx={{ marginBottom:'1rem', marginTop: '1rem', marginLeft: '70rem' }}>
                            Add New
                        </Button>
                        <CustomizedTables
                            headers={headers}
                            rows={filteredEmployees.length > 0 ? filteredEmployees.map(employee => ({
                                "Employee ID": employee.employeeId,
                                "Employee Name": employee.employeeName,
                                "Position": employee.position,
                                "Contact Number": employee.contactNumber,
                                "Email": employee.email,
                                "Basic Salary": employee.basicSalary,
                                "Total Salary": calculateTotalSalary(employee),
                                "Action": (
                                    <div>
                                        <IconButton onClick={() => handleEdit(employee._id)} style={{ color: 'blue' }}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(employee._id)} style={{ color: 'red' }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                )
                            })) : [{ "No Data": "No Data" }]}
                            style={{ fontSize: '16px' }}
                        />
                        
                       
                        
                    </TableCard>
                </Box>
            </div>
        </div>
        </div>
    );
}

export default AllEmployee;
