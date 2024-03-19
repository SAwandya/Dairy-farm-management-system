import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

//dubini

export default function BgCard(props) {
  return (
    <Card style={{ minWidth: 600, borderRadius: 6, marginLeft: 1 ,backgroundColor:'#E7F1F7' }}>
    <CardContent>
      {props.children}
    </CardContent>
    <CardActions>
      
    <Button  borderRadius='5px' sx={{  color: 'black' ,fontFamily:'poppins',marginLeft:'1070PX'}}>View More</Button>
      </CardActions>
  </Card>
  
  );
}