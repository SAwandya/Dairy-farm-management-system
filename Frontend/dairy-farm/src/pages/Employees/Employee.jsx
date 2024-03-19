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



function Employee() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
  
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
    
    

    // Sample handle delete function
    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/api/employee/deleteEmployee/'+id)
        .then(res=>{console.log(res)
        window.location.reload()})
        .catch(err=>console.log(err))
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
        <div style={{ display: 'flex', minWidth: '1036px' }}>
   <Esidebar/>


        <Box sx={{ marginLeft: '12rem',marginTop:'50px' }}>
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
                    rows={dataList.length > 0 ? dataList.map(employee => ({
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
                </TableCard>
            </Box>
       </div>
       </div>
    );
    
}

export default Employee;
