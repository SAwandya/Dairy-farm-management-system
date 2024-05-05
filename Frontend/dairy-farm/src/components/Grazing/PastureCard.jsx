import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import pastureVideo from '../../assets/vdo1.mp4';

function PastureCard({ pasture }) {
  const cardStyle = {
    display: 'flex',
    borderRadius: '20px',
    marginBottom: '30px',
    height: '280px',
    width: '550px',
    fontFamily: 'Poppins',
    boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#f5f5f5',
  };

  const videoContainerStyle = {
    width: '40%',
    borderRadius: '20px 0 0 20px',
    overflow: 'hidden',
  };

  const videoStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const detailsContainerStyle = {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px',
  };

  const detailRowStyle = {
    marginBottom: '10px',
    textAlign: 'left',
  };

  const buttonStyle = {
    fontSize: '12px',
    padding: '6px 12px',
    backgroundColor: '#38775e',
    color: 'white',
    '&:hover': {
      backgroundColor: '#2e5f4e',
    },
  };

  return (
    <Card style={cardStyle}>
      <div style={videoContainerStyle}>
        <video src={pastureVideo} alt="Pasture" style={videoStyle} autoPlay muted loop />
      </div>
      <div style={detailsContainerStyle}>
        <CardContent>
          <Typography variant="h6" style={{ marginBottom: '10px', color: '#006400' }}>
            {pasture.name}
          </Typography>
          <div style={detailRowStyle}>
            <Typography variant="body2">
              <strong>Area:</strong> {pasture.area}
            </Typography>
          </div>
          <div style={detailRowStyle}>
            <Typography variant="body2">
              <strong>Fertilizer Used:</strong> {pasture.fertilizerUsed}
            </Typography>
          </div>
          <div style={detailRowStyle}>
            <Typography variant="body2">
              <strong>Feeding Capacity:</strong> {pasture.feedingCapacity}
            </Typography>
          </div>
          <div style={detailRowStyle}>
            <Typography variant="body2">
              <strong>Assigned Employee:</strong> {pasture.assignedEmployee}
            </Typography>
          </div>
          <div style={detailRowStyle}>
            <Typography variant="body2">
              <strong>Type Of Plants Planted:</strong> {pasture.typeOfPlantsPlanted}
            </Typography>
          </div>
        </CardContent>
        <Button variant="contained" href="/grazingstock" style={buttonStyle}>
             Maintenance
        </Button>
      </div>
    </Card>
  );
}

export default PastureCard;
