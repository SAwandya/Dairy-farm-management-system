import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import StatsCard from './StatsCard';
import axios from 'axios';

function MainStatistics() {
  const [totalSuppliersCount, setTotalSuppliersCount] = useState(0);
  const [contractedSuppliersCount, setContractedSuppliersCount] = useState(0);
  const [permanentSuppliersCount, setPermanentSuppliersCount] = useState(0);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await axios.get('http://localhost:3000/api/supplier');
      setTotalSuppliersCount(response.data.length);
      const contractedSuppliers = response.data.filter(supplier => supplier.supplierType === 'Contracted');
      setContractedSuppliersCount(contractedSuppliers.length);
      const permanentSuppliers = response.data.filter(supplier => supplier.supplierType === 'Permanent');
      setPermanentSuppliersCount(permanentSuppliers.length);
    };
    fetchSuppliers();
  }, []);

  return (
    <Box>
      <Typography
        variant="h3"
        className='main-stats-title'
        sx={{
          fontSize: '18px',
          fontWeight: '600',
          marginTop: '20px'
        }}
      >Supplier Overview</Typography>

      <Box className="stat-cards-container">
        <StatsCard
          title='Total'
          value={totalSuppliersCount}
          icon='../../../src/assets/icon1.png'
        />
        <StatsCard
          title='Contracted'
          value={contractedSuppliersCount}
          icon='../../../src/assets/icon1.png'
        />
        <StatsCard
          title='Permanent'
          value={permanentSuppliersCount}
          icon='../../../src/assets/icon2.png'
        />
      </Box>
    </Box>
  );
}

export default MainStatistics;