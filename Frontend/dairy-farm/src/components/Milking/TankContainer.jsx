import React from 'react';
import { Typography, Grid, TableContainer, Paper, Pagination } from '@mui/material';
import TankCard from './TankCard';

const TankContainer = () => {
  
  const tanks = [
    { id: 1, tankId: '#0001', capacity: 4000, availableMilk: 4000, storedBatches: ['M001', 'M002'] },
    { id: 2, tankId: '#0002', capacity: 5000, availableMilk: 2500, storedBatches: ['M003', 'M004'] },
    { id: 3, tankId: '#0003', capacity: 4500, availableMilk: 1200, storedBatches: ['M005', 'M006'] },
    { id: 4, tankId: '#0004', capacity: 4000, availableMilk: 1000, storedBatches: ['M001', 'M002'] },
    { id: 5, tankId: '#0005', capacity: 5000, availableMilk: 500, storedBatches: ['M003', 'M004'] },
    { id: 6, tankId: '#0006', capacity: 4500, availableMilk: 3200, storedBatches: ['M005', 'M006'] }
  ];

  const [page, setPage] = React.useState(1);
  const tanksPerPage = 3;
  const totalPages = Math.ceil(tanks.length / tanksPerPage);

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
                paddingTop: '24px'
            }}
        >Storage</h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '24px', paddingTop: '0px', width: '80vw' }}>
            <Grid style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '24px', width: '80vw'}}>
                {tanks.slice(startIndex, endIndex).map((tank) => (
                <Grid key={tank.id} item xs={4}>
                    <TankCard tank={tank} />
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
