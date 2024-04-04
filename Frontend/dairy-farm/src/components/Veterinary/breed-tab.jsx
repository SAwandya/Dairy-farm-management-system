import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomizedTables from './table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import axios from 'axios'; 
import { Button } from '@mui/material';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div sx={{ backgroundColor: '#E7F1F7', fontFamily: 'Poppins, sans-serif' }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
       <Box sx={{ p: 3, backgroundColor: '#E7F1F7' }}>
          <Typography>{children}</Typography>
        </Box>

      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function BasicTabs({ handleToggleVaccineAnim, handleToggleExamAnim }) {
  const [value, setValue] = useState(0);
  const [vaccineData, setVaccineData] = useState({});
  const [examData, setExamData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vaccineResponse = await axios.get("http://localhost:3000/api/vacAnim/retrieve");
        if (vaccineResponse.data.success) {
          setVaccineData(vaccineResponse.data.data[0] || {});
        }
      } catch (error) {
        console.error("Error fetching vaccine data:", error);
        alert("Error fetching vaccine data. Please try again later.");
      }

      try {
        const examResponse = await axios.get("http://localhost:3000/api/exmAnim/retrieve");
        if (examResponse.data.success) {
          setExamData(examResponse.data.data[0] || {});
        }
      } catch (error) {
        console.error("Error fetching exam data:", error);
        alert("Error fetching exam data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const headers1 = [
    "Ear Tag",
    "Status",
    "Vaccine",
    "Vaccinated Date",
    "Next Vaccination",
    "Age",
    "Action",
  ];
  const headers2 = [
    "Ear Tag",
    "Current Status",
    "Examination",
    "Date",
    "Action",
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{  color: '#E7F1F7', fontFamily: 'Poppins, sans-serif' }}>
      <Box sx={{ borderBottom: 1, display: 'flex', backgroundColor: '#E7F1F7' ,marginRight:'10px' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ marginLeft: 'auto' }}
        >
          <Tab label="Vaccination" {...a11yProps(0)} sx={{ fontFamily: 'Poppins, sans-serif',fontSize:'20px' }} />
          <Tab label="Examination" {...a11yProps(1)} sx={{ fontFamily: 'Poppins, sans-serif',fontSize:'20px' }} />
        </Tabs>
      </Box>
     
      <CustomTabPanel value={value} index={0}>
        <CustomizedTables
          headers={headers1}
          rows={[{
            "Ear Tag": vaccineData.earTag || "",
            "Status": vaccineData.status || "",
            "Vaccine": vaccineData.vaccine || "",
            "Vaccinated Date": vaccineData.vacdate || "",
            "Next Vaccination": vaccineData.nextdate || "",
            "Age": vaccineData.age || "",
            "Action": (
              <div>
                  <IconButton onClick={() => handleEdit(vaccineData._id)} style={{ color: 'blue' }}>
                      <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(vaccineData._id)} style={{ color: 'red' }}>
                      <DeleteIcon />
                  </IconButton>
              </div>
          )
          }]}
        /> 
      
        <div>
          <Button
            borderRadius='5px'
            sx={{ color: '#00000089', fontFamily: 'Poppins, sans-serif', fontSize: '20px', marginLeft: '980px' }}
            onClick={handleToggleVaccineAnim}
          >
            View More
          </Button>
        </div>
      </CustomTabPanel>

      
      <CustomTabPanel value={value} index={1}>
        <CustomizedTables
          headers={headers2}
          rows={[{
            "Ear Tag": examData.earTag || "",
            "Current Status": examData.currentStatus || "",
            "Examination": examData.exam || "",
            "Date": examData.checkdate || "",
            "Action": (
              <div>
                  <IconButton onClick={() => handleEdit(examData._id)} style={{ color: 'blue' }}>
                      <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(examData._id)} style={{ color: 'red' }}>
                      <DeleteIcon />
                  </IconButton>
              </div>
          )
          }]}
        /> 
      
        <div>
          <Button
            borderRadius='5px'
            sx={{ color: '#00000089', fontFamily: 'Poppins, sans-serif', fontSize: '20px', marginLeft: '980px' }}
            onClick={handleToggleExamAnim }
          >
            View More
          </Button>
        </div>
      </CustomTabPanel>
    </Box>
  );
}
