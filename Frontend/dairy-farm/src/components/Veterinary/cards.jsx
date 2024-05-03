import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function BasicCard(props) {
  return (
    <Card sx={{ width: 300, borderRadius: 5, backgroundColor: '#00ff1a2b', maxHeight: '150px', position: 'relative' }}>
      <CardContent>
        <Typography sx={{ fontSize: 20, fontFamily: 'Poppins, sans-serif' }} color="#000000" gutterBottom>
          {props.title}
          <img src={props.imgs} style={{ height: '45px', float: 'right' }} />
        </Typography>

        <Typography sx={{ mb: 1.5, fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: 20 }} color="text.secondary">
          {props.data}
        </Typography>

      </CardContent>
      <CardActions style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
      <Link to={props.links}>
        <Button 
          borderRadius='5px'
          sx={{
            backgroundColor: '#FBFFEC',
            color: 'black',
            fontFamily: 'Poppins, sans-serif',
            borderRadius: 5,
            fontSize: '10px',
            '&:hover': {
              backgroundColor: '#DFF0D8', 
            }
          }}
        >View</Button>
      </Link>
      </CardActions>
    </Card>
  );
}
