import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function BgCard(props) {
  return (
    <Card style={{ minWidth: 600, borderRadius: 6, marginLeft: 2, backgroundColor: '#E7F1F7' }}>
      <CardContent>
        {props.children}
      </CardContent>
      <CardActions>
        <Link to="/AnimalReg">
          <Button
            borderRadius='5px'
            sx={{ color: 'black', marginLeft: '1280px', marginTop: '-40px', fontFamily: 'Poppins, sans-serif', fontSize: '20px' }}
          >
            View More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
