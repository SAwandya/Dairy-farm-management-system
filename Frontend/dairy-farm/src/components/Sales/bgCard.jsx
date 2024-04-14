import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

export default function BgCard(props) {

  const { data, text } = props;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          borderRadius: "15px",
          backgroundColor: "#E7F1F7",
          width: "300px",
          height: "140px",
        }}
      >
        <CardContent sx={{ padding: '26px' }}>
          <Typography sx={{ fontSize: "20px", fontWeight: "100px" }}>
            {text} :
          </Typography>
          <Typography sx={{ fontSize: "40px", fontWeight: "140px" }}>
            {data}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
