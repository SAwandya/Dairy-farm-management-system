import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function BgCard(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ borderRadius: 6, backgroundColor: '#E7F1F7', width: 1200 }}>
        <CardContent>
          {props.children}
        </CardContent>
        <CardActions>
          <Link to="/AnimalReg">
            <Button
              borderRadius='5px'
              sx={{ color: '#00000089', fontFamily: 'Poppins, sans-serif', fontSize: '20px',marginLeft:'1030px' }}
            >
              View More
            </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}
