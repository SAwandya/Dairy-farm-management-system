import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import '../../../../styles/Finance/MainDashboard/ThreeCards.css'

function ThreeCards() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Card className="card-container">
          <CardContent>
            <Typography variant="h5" component="h2">
              Monthly Spendings
            </Typography>
            <Typography variant="body2" component="p">
              $5000
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card className="card-container">
          <CardContent>
            <Typography variant="h5" component="h2">
              Finance Stat
            </Typography>
            <Typography variant="body2" component="p">
              Some finance stat here
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card className="card-container">
          <CardContent>
            <Typography variant="h5" component="h2">
              Placeholder
            </Typography>
            <Typography variant="body2" component="p">
              Placeholder content
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ThreeCards;
