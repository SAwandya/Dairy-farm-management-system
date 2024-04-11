import React, { useState, useEffect } from 'react';
import { Typography, Grid, TableContainer, Paper, Pagination } from '@mui/material';
import TankCard from './TankCard';
import axios from 'axios';

const TankContainer = () => {

  const [tanks, setTanks] = useState([]);
  const [page, setPage] = useState(1);
  const tanksPerPage = 3;
  const [totalPages, setTotalPages] = useState(1); 

  useEffect(() => {
    const fetchTanks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/storageTank');
        if (response.data.success) {
          setTanks(response.data.data);
          setTotalPages(Math.ceil(response.data.data.length / tanksPerPage));
        } else {
          console.error('Failed to fetch storage tanks:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching storage tanks:', error);
      }
    };

    fetchTanks();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * tanksPerPage;
  const endIndex = Math.min(startIndex + tanksPerPage, tanks.length);

  return (
    <TableContainer component={Paper} style={{ borderRadius: '15px' }}>
        <h2
            style={{
                fontFamily: 'Poppins',
                paddingLeft: '24px',
                paddingTop: '16px'
            }}
        >Storage</h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '24px', paddingTop: '0px', width: '80vw' }}>
        <Grid
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '24px',
            paddingTop: '10px',
            width: '80vw'
          }}
        >
          {tanks.slice(startIndex, endIndex).map((tank) => (
            <Grid key={tank._id} item xs={4}>
              <TankCard tank={{ ...tank}} />
            </Grid>
          ))}
        </Grid>
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                size="large"
                color="primary"
            />
        </div>
    </TableContainer>
  );
};

export default TankContainer;
