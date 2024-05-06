import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CustomizedTables from '../../components/Employees/etable'; // Import your customized table component
import TableCard from '../../components/Employees/tablecards';
import Esidebar from "../../components/Employees/esidebar";
import DateV from '../../components/Veterinary/DateV';
import BgCards from "../../components/Employees/bgcards";
import { PieChart, Pie, Cell, Tooltip } from 'recharts'; // Import PieChart, Pie, Cell, and Tooltip
import '../../styles/employee.css'
const MyComponent = () => {
    const [dataList, setDataList] = useState([]);
    const [totalAttendance, setTotalAttendance] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalEmployees, setTotalEmployees] = useState(50); // Assuming total employees are 50

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        calculateTotalAttendance();
    }, [dataList]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/employee/data');
            // Assuming the CSV data includes an 'attendance' field
            const markedDataList = response.data.map(data => ({
                ...data,
                "Attendance": "Present", // Marking all data as present
                "Style": { color: 'green' } // Adding style to render text in green color
            }));
            setDataList(markedDataList);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to calculate total attendance
    const calculateTotalAttendance = () => {
        const total = dataList.filter(data => data.Attendance === "Present").length;
        setTotalAttendance(total);
    };

    const headers = ["Date & Time", "Employee ID", "Attendance"];

    const presentEmployeesData = [
        { name: 'Present', value: totalAttendance },
        { name: 'Absent', value: totalEmployees - totalAttendance }
    ];

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <Esidebar />
                <Box sx={{ marginLeft: '11rem', marginTop: '50px', overflow: 'hidden', width: '85%' }}>
                    <Typography variant="h4" sx={{ marginLeft: '1rem', fontSize: '14px', fontWeight: 'bold', fontFamily: 'Poppins' }}>
                        Welcome Back,
                    </Typography>
                    <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '30px', fontWeight: 'bold', fontFamily: 'Poppins' }}>
                        Hello Disara,
                    </Typography>
                    <Box sx={{ marginLeft: '11rem',marginTop:'-60px' ,width:'86%' }}>
                <DateV/>
                </Box>
                   
                    <Box className="pie-chart-container" position="relative">
  <div className="white-box" style={{
    position: 'absolute',
    top: 0,
    left: '100px',
    width: '60%',
    height: '390px', /* Adjust height as needed */
    backgroundColor: 'white',
    borderRadius:'30px',
    
    zIndex: 10, /* Ensure it's above the pie chart */
  }}>
  <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '18px', fontWeight: 'bold', zIndex: 20,marginTop:'10px' }}>
    Today's Attendance
  </Typography>
  <div className="pie-chart-wrapper" style={{ zIndex: 15 ,display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',}}>
  <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
    <PieChart width={700} height={700}>
      <Pie
        data={presentEmployeesData}
        cx={350}
        cy={150}
        labelLine={false}
        label={({ name }) => name}
        outerRadius={150}
    
        
              innerRadius={50}
              paddingAngle={2}
              cornerRadius={5}
              fill="#8884d8"
      >
        {presentEmployeesData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={index === 0 ? '#82ca9d' : '#ff6d75'} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </div>
  </div>
  </div>
</Box>

                    <div style={{ width: '100%', marginTop: '20px', marginLeft: '1rem' }}></div>
                    <TextField
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search..."
                        InputProps={{
                            startAdornment: (<SearchIcon />),
                            style: { marginBottom: '-20px', width: '250px', borderRadius: '20px', marginLeft: '1000px' }
                        }}
                        variant="outlined"
                    />
                   
                    <Box sx={{ marginLeft: '2rem', marginTop: '360px', marginRight: '1rem', display: 'fixed', width: '100%' }}>
                        <TableCard>
                            <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '18px', fontWeight: 'bold' }}>
                                Attendance
                            </Typography>
                            <CustomizedTables
                                headers={headers}
                                rows={dataList.length > 0 ? dataList.map(data => ({
                                    "Date & Time": data.timestamp.split('T')[0],
                                    "Employee ID": data.employeeId,
                                    // Extracting date part from timestamp
                                    "Attendance": "present",
                                })) : [{ "No Data": "No Data" }]}
                            />
                        </TableCard>
                    </Box>
                </Box>
               


            </div>
        </div>
    );
};

export default MyComponent;
