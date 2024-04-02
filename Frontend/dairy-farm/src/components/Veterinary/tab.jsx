import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomizedTables from './table';
import CustomizedTables1 from './table2';
import axios from 'axios';
import Button from '@mui/material/Button'; // Import Button component 
import { Link } from 'react-router-dom'; // Import Link component
import BreedPieChart from './breedingPie';
import Grid from '@mui/material/Grid';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      sx={{
        backgroundColor: '#E7F1F7',
        fontFamily: 'Poppins, sans-serif',
      }}
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

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [dataList1, setDataList1] = useState([]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/animalReg/retrieve");
      if (response.data.success) {
        setDataList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data. Please try again later.");
    }
  };
  const getFetchData1 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/exmAnim/retrieve2/pregnant");
      if (response.data.success) {
        setDataList1(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data. Please try again later.");
    }
  };

  useEffect(() => {
    getFetchData();
    getFetchData1();
  }, []);

  const headers1 = [
    "Ear Tag",
    "Location",
    "Gender",
    "Status",
    "Age",
  ];
  const headers2 = [
    "Ear Tag",
    "Date",
    "Status",
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ color: '#E7F1F7', fontFamily: 'Poppins, sans-serif' }}>
      <Box sx={{ borderBottom: 1, display: 'flex', backgroundColor: '#E7F1F7', marginRight: '10px' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ marginLeft: 'auto' }}
        >
          <Tab label="Registry" {...a11yProps(0)} sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px' }} />
          <Tab label="Health-Care" {...a11yProps(1)} sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px' }} />
          <Tab label="Breeding" {...a11yProps(2)} sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px' }} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CustomizedTables
          headers={headers1}
          rows={dataList.length > 0 ? [dataList[0]].map(item => ({
            "Ear Tag": item.earTag,
            "Location": item.location,
            "Gender": item.gender,
            "Status": item.status,
            "Age": item.age,
          })) : [{ "No Data": "No Data" }]}
        />
        
          <Link to="/AnimalReg">
            <Button
              borderRadius='5px'
              sx={{ color: '#00000089', fontFamily: 'Poppins, sans-serif', fontSize: '20px', marginLeft: '980px' }}
            >
              View More
            </Button>
          </Link>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Grid container spacing={2}>
          {/* Left side: BreedPieChart */}
          <Grid item xs={6}>
            <BreedPieChart/>
          </Grid>
          <Grid item xs={6}>
            <CustomizedTables1 
                  headers={headers2}
                  rows={dataList1.length > 0 ? 
                    dataList1.map(item => ({
                        "Ear Tag": item.earTag,
                        "Date": item.checkdate,
                        "Status": item.currentStatus,
                    })) : 
                    [{ "No Data": "No Data" }]
                }
                />
                <Link to="/breedAnim">
                  <Button
                    borderRadius='5px'
                    sx={{ color: '#00000089', fontFamily: 'Poppins, sans-serif', fontSize: '20px', marginLeft: '980px' }}
                  >
                    View More
                  </Button>
                </Link>
            </Grid>
        </Grid>
      </CustomTabPanel>

    </Box>
   
  );
}
