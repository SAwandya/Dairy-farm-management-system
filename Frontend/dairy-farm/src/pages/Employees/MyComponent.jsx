import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomizedTables from '../../components/Employees/etable'; // Import your customized table component
import TableCard from '../../components/Employees/tablecards';
import Esidebar from "../../components/Employees/esidebar";
import { Box, Typography } from '@mui/material'; 
const MyComponent = () => {
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

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

    // Get today's date and format it
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

    // Grouping the data by date and calculating total present for each date
    const groupedData = dataList.reduce((acc, data) => {
        const date = data.date; // Assuming 'date' is the key for the date field
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(data);
        return acc;
    }, {});

    const headers = ["Date & Time", "Employee ID",  "Attendance"];

    // Calculating total present for each date
    const rows = Object.keys(groupedData).map(date => ({
        "Date": date,
        "Total Present": groupedData[date].length
    }));

    return (
        <div>
             <div style={{ display: 'flex' }}>
        <Esidebar/>
        
          <Box sx={{ marginLeft: '12rem', marginTop:'50px' ,marginRight:'1rem'}}>
                <Typography variant="h4" sx={{ marginLeft: '1rem', fontSize: '14px', fontWeight: 'bold' ,fontFamily: 'Poppins'}}>
                    Welcome Back,
                </Typography>
                <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '30px', fontWeight: 'bold' ,fontFamily: 'Poppins'}}>
                   Hello Disara,
                </Typography>
            <TableCard>
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
        </div>
        </div>
    );
};

export default MyComponent;
