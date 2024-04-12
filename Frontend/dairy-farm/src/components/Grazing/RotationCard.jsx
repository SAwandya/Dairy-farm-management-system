import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

function RotationCard({ session }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const cardStyle = {
    display: 'flex',
    borderRadius: '20px',
    marginBottom: '30px',
    height: '280px',
    width: '550px',
    fontFamily: 'Poppins',
    boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#f5f5f5',
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.5s',
  };

  const cardContentStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
  };

  const frontStyle = {
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  };

  const backStyle = {
    transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)',
  };

  const flipButtonStyle = {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    zIndex: '1',
  };

  return (
    <Card style={cardStyle}>
      <div style={{ ...cardContentStyle, ...frontStyle }}>
        <CardContent>
          <Typography variant="h6" style={{ marginBottom: '10px', color: '#006400' }}>
            Session Details
          </Typography>
          <div>
            <Typography variant="body2">
              <strong>Grazing Area:</strong> {session && session.grazingArea ? session.grazingArea : 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Cow Batch:</strong> {session && session.cowBatch ? session.cowBatch : 'N/A'}
            </Typography>
          </div>
        </CardContent>
        <Button variant="contained" onClick={handleClick} style={flipButtonStyle}>
          Show Duration
        </Button>
      </div>
      <div style={{ ...cardContentStyle, ...backStyle }}>
        <CardContent>
          <Typography variant="h6" style={{ marginBottom: '10px', color: '#006400' }}>
            Session Duration
          </Typography>
          <div>
            <Typography variant="body2">
              <strong>Grazing Duration:</strong> {session && session.grazingDuration ? session.grazingDuration : 'N/A'}
            </Typography>
          </div>
        </CardContent>
        <Button variant="contained" onClick={handleClick} style={flipButtonStyle}>
          Back
        </Button>
      </div>
    </Card>
  );
}

export default RotationCard;
