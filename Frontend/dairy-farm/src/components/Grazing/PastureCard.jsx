import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';

function PastureCard({ pasture }) {
  const cardStyle = {
    display: 'flex',
    borderRadius: '10px',
    marginBottom: '20px',
    height: '265px', // Adjust height as needed
    width: '570px'
  };

  const imageContainerStyle = {
    flex: '1',
    borderRadius: '10px 0 0 10px',
    overflow: 'hidden',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const detailsContainerStyle = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px',
  };

  const detailRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  };

  return (
    <Card style={cardStyle}>
      <div style={imageContainerStyle}>
        <img src={pasture.photo} alt="Pasture" style={imageStyle} />
      </div>
      <div style={detailsContainerStyle}>
        <CardContent
            sx={{
                padding: '0',
            }}
        >
          <Typography
            variant="h5"
          >
            {pasture.name}
          </Typography>
          <div style={detailRowStyle}>
            <Typography variant="body1">
              Area:
            </Typography>
            <Typography variant="body1">
              {pasture.area}
            </Typography>
          </div>
          <div style={detailRowStyle}>
            <Typography variant="body1">
              Fertilizer Used:
            </Typography>
            <Typography variant="body1">
              {pasture.fertilizerUsed}
            </Typography>
          </div>
          <div style={detailRowStyle}>
            <Typography variant="body1">
              Feeding Capacity:
            </Typography>
            <Typography variant="body1">
              {pasture.feedingCapacity}
            </Typography>
          </div>
          <div style={detailRowStyle}>
            <Typography variant="body1">
              Assigned Employee:
            </Typography>
            <Typography variant="body1">
              {pasture.assignedEmployee}
            </Typography>
          </div>
          <div style={detailRowStyle}>
            <Typography variant="body1">
              Type Of Plants Planted:
            </Typography>
            <Typography variant="body1">
              {pasture.typeOfPlantsPlanted}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Edit
          </Button>
          <Button size="small" color="secondary">
            Delete
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}

export default PastureCard;