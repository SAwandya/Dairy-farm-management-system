import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function BgCard(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ borderRadius: 6, backgroundColor: '#E7F1F7', width: 1200 }}>
        <CardContent>
          {props.children}
        </CardContent>
        
      </Card>
    </div>
  );
}
