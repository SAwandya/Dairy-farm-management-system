import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import '../../../../styles/Finance/MainDashboard/ThreeCards.css'
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

//comment

function ThreeCards() {
  return (
    <Grid container spacing={3} justifyContent="space-between">
      <Grid item xs={12} sm={3}>
        <Card className="card-container" sx={{ minWidth: 275, borderRadius: 5, marginLeft: 0, backgroundColor: '#00ff1a2b', maxHeight: '150px', position: 'relative' }}>
          <CardContent>
            <Typography variant="h5" component="h2" sx={{ fontSize: 22, fontStyle: 'poppins' }} color="#000000" gutterBottom>
              Monthly Spendings
            </Typography>
            <Typography variant="body2" component="p" sx={{ fontSize: 16, fontStyle: 'poppins' }} color="#000000" gutterBottom>
              LKR.250,000.00
            </Typography>
          </CardContent>
          <CardActions style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
        <Button borderRadius='5px' sx={{ backgroundColor: '#FBFFEC', color: 'black', fontFamily: 'poppins', borderRadius: 5, fontSize: '10px' }}>
          <Link to="/financetrans" style={{ textDecoration: 'none', color: 'inherit' }}>View</Link></Button>
      </CardActions>
        </Card>

      </Grid>
      <Grid item xs={12} sm={3}>
        <Card className="card-container" sx={{ minWidth: 275, borderRadius: 5, marginLeft: 0, backgroundColor: '#00ff1a2b', maxHeight: '150px', position: 'relative' }}>
          <CardContent>
            <Typography variant="h5" component="h2" sx={{ fontSize: 22, fontStyle: 'poppins' }} color="#000000" gutterBottom>
              Cash Flow
            </Typography>
            <Typography variant="body2" component="p" sx={{ fontSize: 16, fontStyle: 'poppins' }} color="#000000" gutterBottom>
              LKR.175,000.00
            </Typography>
          </CardContent>
        <CardActions style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
        <Button borderRadius='5px' sx={{ backgroundColor: '#FBFFEC', color: 'black', fontFamily: 'poppins', borderRadius: 5, fontSize: '10px' }}>
          <Link to="/financetrans" style={{ textDecoration: 'none', color: 'inherit' }}>View</Link></Button>
      </CardActions>
        </Card>

      </Grid>
      <Grid item xs={12} sm={2.5}>
        <Card className="card-container" sx={{ minWidth: 275, borderRadius: 5, marginLeft: 0, backgroundColor: '#00ff1a2b', maxHeight: '150px', position: 'relative' }}>
          <CardContent>
            <Typography variant="h5" component="h2" sx={{ fontSize: 22, fontStyle: 'poppins' }} color="#000000" gutterBottom>
              Profit Margin Percentage
            </Typography>
            <Typography variant="body2" component="p" sx={{ fontSize: 16, fontStyle: 'poppins' }} color="#000000" gutterBottom>
              33%
            </Typography>
          </CardContent>
          <CardActions style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
        <Button borderRadius='5px' sx={{ backgroundColor: '#FBFFEC', color: 'black', fontFamily: 'poppins', borderRadius: 5, fontSize: '10px' }}>
          <Link to="/financebud" style={{ textDecoration: 'none', color: 'inherit' }}>View</Link></Button>
      </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ThreeCards;
