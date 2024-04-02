import React, { useState, useEffect } from "react";
import CustomizedTables from '../../components/Veterinary/table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; 
import { Box, Typography } from '@mui/material'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TableCard from '../../components/Employees/tablecards';
import Esidebar from "../../components/Employees/esidebar";
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TablePagination from '@mui/material/TablePagination';

/*const calculateTotalSalary = (user) => {
    const epfRate = 0.08; // Assuming EPF rate is 8%
    const bonusRate = 0.1; // 10% bonus

    const basicSalary = user.basicSalary || 0;
    const epfDeduction = basicSalary * epfRate;
    const bonus = basicSalary * bonusRate;

    return basicSalary - epfDeduction + bonus;
};
*/
function AllEmployee() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
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
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
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
    
    
    const handleSeeMore = () => {
        navigate('/allEmployee');
    };
    // Sample handle delete function
  

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
        
        <div>
        <div style={{ display: 'flex', minWidth: '1036px',overflow: 'hidden'  }}>
   <Esidebar/>
    


        <Box sx={{ marginLeft: '10rem',marginTop:'50px' }}>
            <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '32px', fontWeight: 'bold' ,fontFamily: 'Poppins'}}>
  Welcome Disara,
</Typography>
<Box
    sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        padding: '1rem',
        zIndex: 999,
    }}
>
    <IconButton onClick={() => navigate('/employeedashboard')} color="inherit">
        <CloseIcon />
    </IconButton>
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
                    rows={dataList.length > 0 ? dataList.slice().map(employee => ({
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
    );
}

export default AllEmployee;
