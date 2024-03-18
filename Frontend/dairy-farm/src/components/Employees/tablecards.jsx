import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const TableCard = ({ children }) => {
  return (
    <Card sx={{ bgcolor: '#E7F1F7', marginTop: '20px' }}>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default TableCard;
