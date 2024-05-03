import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import axios from 'axios';
import jspdf from 'jspdf';
import 'jspdf-autotable';

// Component to generate PDF report
const Report = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Fetch attendance data from an API or any other source
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/employee/data');
        setAttendanceData(response.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchData();
  }, []);

  const handleGenerateReport = async () => {
    try {
      const doc = new jspdf();
      const tableRows = [];

      attendanceData.forEach((entry, index) => {
        const attendanceEntry = [
          entry.timestamp,
          entry.employeeId,
         "present",
        ];
        tableRows.push(attendanceEntry);
      });
      
      // Title
      doc.setFontSize(20).setTextColor(56, 119, 91).setFont('helvetica', 'bold').text('Attendance Report', 14, 10);

      doc.autoTable(["Timestamp","Employee ID", "Status"], tableRows, {
        styles: { fontSize: 10 },
        startY: 20,
        headerStyles: { fillColor: [31, 41, 55] },
      });

      doc.save('Attendance_Report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF report. Please try again later.');
    }
  };

  return (
    <Button onClick={handleGenerateReport} variant="contained" color="primary">
      Generate Report
    </Button>
  );
};

export default Report;
