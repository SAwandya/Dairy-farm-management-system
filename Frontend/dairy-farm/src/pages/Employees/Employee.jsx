import React, { useState, useEffect } from "react";
import CustomizedTables from '../../components/Veterinary/table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; 
import { Box, Typography } from '@mui/material'; 
import BgCards from "../../components/Employees/bgcards";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TableCard from '../../components/Employees/tablecards';
import Esidebar from "../../components/Employees/esidebar";
import axios from 'axios';
import TablePagination from '@mui/material/TablePagination';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Swal from 'sweetalert2';

function Employee() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(1);
    const [showAll, setShowAll] = useState(false); 
    
    useEffect(() => {
        axios.get("http://localhost:3000/api/employee/")
        .then(result => {
            console.log(result.data);
            // Set the dataList state with the fetched data
            setDataList(result.data);
            setLoading(false); // Set loading to false when data is fetched
        })
        .catch(err => {
            console.log(err);
            setLoading(false); // Set loading to false on error as well
        });
    }, []);
    
    const handleSeeMore = () => {
        navigate('/allEmployee');
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const calculateTotalSalary = (employee) => {
      const epfRate = 0.08; // Assuming EPF rate is 8%
      const bonusRate = 0.1; // 10% bonus
  
      const basicSalary = employee.basicSalary || 0;
      const epfDeduction = basicSalary * epfRate;
      const bonus = basicSalary * bonusRate;
  
      return basicSalary - epfDeduction + bonus;
    };
  
    // Sample data list state with one employee
    const [dataList, setDataList] = useState([
        {
            
            
        }
    ]);
    const handleAddEmployee = (e) => {
        e.preventDefault();
    
    
        // Add the new user to the state
        setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    
        // Clear the form fields
        e.target.reset();
      };
    // Sample handle edit function
    const handleEdit = (id) => {
        navigate(`/updateEmployee/${id}`);
    };
    
    

    const handleDelete = (id) => {
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
                // If the user confirms the deletion, proceed with the API call
                axios.delete('http://localhost:3000/api/employee/deleteEmployee/'+id)
                    .then(res => {
                        console.log(res);
                        window.location.reload();
                    })
                    .catch(err => console.log(err));
            }
        });
    };

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/createEmployee');
    };

    // Define headers outside of any function to make it accessible throughout the component
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

    return (
        <body style={{ overflow: "hidden" }}>
        <div>
        <div style={{ display: 'flex', minWidth: '1036px',overflow: 'hidden'  }}>
   <Esidebar/>


        <Box sx={{ marginLeft: '14rem',marginTop:'50px' ,overflow: 'hidden' }}>
            <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '32px', fontWeight: 'bold' ,fontFamily: 'Poppins'}}>
  Welcome Disara,
</Typography>

                    <Box sx={{ display: 'fixed' ,width:'100px',marginLeft: '-15rem',marginTop:'10px'}}>

                <BgCards>
                <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'Poppins' }}>
                   Total Employees
                   <IconButton size="small" color="inherit">
          <AccountCircleIcon />
        </IconButton>
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '16px', fontFamily: 'Poppins' }}>
         45
        </Typography>
                </BgCards>
                <BgCards>
    <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'Poppins' }}>
        Completed Tasks
        <IconButton size="small" color="inherit">
            <AssignmentIcon />
        </IconButton>
    </Typography>
    <Typography variant="body1" sx={{ fontSize: '16px', fontFamily: 'Poppins' }}>
         25
        </Typography>
</BgCards>


                <BgCards>
                <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: 'bold',  fontFamily: 'Poppins'}}>
                    Total Hours
                    <IconButton size="small" color="inherit" >
          <AccessTimeIcon />
        </IconButton>
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '16px', fontFamily: 'Poppins' }}>
          10 hours
        </Typography>
                </BgCards>
            </Box>
            <TableCard>
            <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '18px' , fontWeight: 'bold'}}>
 Employee
</Typography>
            <Button variant="contained" color="success" onClick={handleClick} sx={{ marginBottom:'1rem',marginTop: '1rem', marginLeft: '62rem' }}>
    Add New
</Button>

            
           
<CustomizedTables
                    headers={headers}
                    //changed
                    rows={dataList.length > 0 ? dataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(employee => ({
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
                />
                <TablePagination
                    rowsPerPageOptions={[1, 5, 10]}
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
            </Box>
       </div>
       </div>
       </body>
    );
    
}

export default Employee;