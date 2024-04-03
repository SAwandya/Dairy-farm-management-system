import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import axios from 'axios';
import jspdf from 'jspdf';
import 'jspdf-autotable';
import companyLogo from '../../assets/sidebar-logo.png';
// Component to generate PDF report
const Report = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employees data from an API or any other source
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/employee/');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchData();
  }, []);
  const calculateTotalSalary = (employee) => {
    const epfRate = 0.08; // Assuming EPF rate is 8%
    const bonusRate = 0.1; // 10% bonus

    const basicSalary = employee.basicSalary || 0;
    const epfDeduction = basicSalary * epfRate;
    const bonus = basicSalary * bonusRate;

    return basicSalary - epfDeduction + bonus;
  };

  const handleGenerateReport = async () => {
    try {
      const doc = new jspdf();
      const tableRows = [];

      employees.forEach((employee, index) => {
        const employeeData = [
          employee.employeeId,
          employee.employeeName,
          employee.position,
          employee.contactNumber,
          employee.email,
          employee.basicSalary,
          calculateTotalSalary(employee),
        ];
        tableRows.push(employeeData);
      });
      const date = new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }); // Initialize date here

      const margin = 14; // Left margin
      const logoWidth = 30; // Logo width
      const logoHeight = 20; // Logo height
      const maxWidth = 290; // Calculate maximum width available for text
      const textLines = doc.splitTextToSize(
        `The employee management system contains essential data such as employee identification details, employment status, job history, and other relevant information crucial for efficient HR management. Through comprehensive documentation and organization, this system ensures effective oversight and management of employees, enabling informed decision-making processes and enhancing overall workforce productivity and well-being.`,
        maxWidth
      );
      const textParagraph = textLines.join('\n');
      //Add company logo
     doc.addImage(companyLogo, 'PNG', doc.internal.pageSize.width - margin - logoWidth, margin, logoWidth, logoHeight);
  
      // Add company address
      doc.setFontSize(10).setFont('helvetica').text('Nevil Nutri Feeds Pvt.Ltd', margin, margin + 10);
      doc.text('No:241, Rdawana', margin, margin + 15);
      doc.text('Henagama Rd', margin, margin + 20);
      doc.text('Gampaha', margin, margin + 25);
      doc.text('Sri Lanka', margin, margin + 30);
  
      // Add current date
      doc.setFontSize(10).text(`Date: ${date}`, margin, margin + 35);
  
      // Title
      doc.setFontSize(20).setTextColor(56, 119, 91).setFont('helvetica', 'bold').text('Employee Registration Report', margin, 70);
  
      // Introduction paragraph
  
      
      doc.setFontSize(10).setFont('helvetica', 'normal').setTextColor(0, 0, 0).text(
        textParagraph,
        margin,
        80,
        { maxWidth: maxWidth } // Specify maxWidth option for text
      );
     

      doc.autoTable(["Employee ID", "Employee Name", "Position", "Contact Number", "Email", "Basic Salary", "Total Salary"], tableRows, {
        styles: { fontSize: 10 },
        startY: 100,
        headerStyles: { fillColor: [31, 41, 55] },
      });

      doc.save('Employee_Report.pdf');
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
