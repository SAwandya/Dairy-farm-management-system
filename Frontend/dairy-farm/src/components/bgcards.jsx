import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function BgCards(props) {
  return (
    <Card sx={{ minWidth: '300px', borderRadius: 6, marginLeft: 30, marginRight: '-150px', height: '135px', bgcolor: 'rgb(0,225,25,0.1)' }}>
      <CardContent>
        {props.children}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', marginBottom: '200px' }}>
      <Button size="small" sx={{ bgcolor: '#FBFFEC',color: 'black', borderRadius: 20}}>View <ArrowForwardIcon /></Button>
      </CardActions>
      
    </Card>
  );
}