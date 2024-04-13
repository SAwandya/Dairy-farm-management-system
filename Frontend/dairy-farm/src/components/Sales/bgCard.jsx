import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function BgCard(props) {

  const { data } = props;

  console.log(data);

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
        <CardContent>{data}</CardContent>
      </Card>
    </div>
  );
}
