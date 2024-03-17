import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function BasicCard(props) {
  return (
    <Card sx={{ minWidth: 275, borderRadius: 5, marginLeft: 0, backgroundColor: '#00ff1a2b', maxHeight: '150px', position: 'relative' }}>
      <CardContent>
        <Typography sx={{ fontSize: 20, fontStyle: 'poppins' }} color="#000000" gutterBottom>
          {props.title}
          <img src={props.imgs} style={{ height: '45px', float: 'right' }} />
        </Typography>

        <Typography sx={{ mb: 1.5, fontStyle: 'poppins', fontWeight: 'bold', fontSize: 20 }} color="text.secondary">
          {props.data}
        </Typography>

      </CardContent>
      <CardActions style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
        <Button borderRadius='5px' sx={{ backgroundColor: '#FBFFEC', color: 'black', fontFamily: 'poppins', borderRadius: 5, fontSize: '10px' }}>View More</Button>
      </CardActions>
    </Card>
  );
}
