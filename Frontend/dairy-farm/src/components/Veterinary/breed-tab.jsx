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


// Define CustomTabPanel component
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

// Define BasicTabs component
export default function BasicTabs({ handleToggleVaccineAnim }) {
  const [value, setValue] = useState(0);
  const [dataList, setDataList] = useState([]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/vacAnim/retrieve");
      if (response.data.success) {
        setDataList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data. Please try again later.");
    }
  };

  useEffect(() => {
    getFetchData();
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
          rows={dataList.length > 0 ? [dataList[0]].map(item => ({
            "Ear Tag": item.earTag,
            "Status": item.status,
            "vaccine":item.vaccine,
            "Vaccinated Date":item.vacdate,
            "Next Vaccination": item.nextdate,
            "Ages": item.age,
            "Action": (
              <div>
                  <IconButton onClick={() => handleEdit(item._id)} style={{ color: 'blue' }}>
                      <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item._id)} style={{ color: 'red' }}>
                      <DeleteIcon />
                  </IconButton>
              </div>
          )
          })) : [{ "No Data": "No Data" }]}
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
    </Box>
  );
}
