import React, { useEffect, useState } from "react";
import { CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import axios from 'axios';

const COLORS = ['#a8bdb7', '#1a6952'];

function SessionPieChart() {
  const [sessionCounts, setSessionCounts] = useState({
    morning: 0,
    evening: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const morningResponse = await axios.get('http://localhost:3000/api/sessions/count/morning');
        const eveningResponse = await axios.get('http://localhost:3000/api/sessions/count/evening');
        setSessionCounts({
          morning: morningResponse.data.count,
          evening: eveningResponse.data.count,
        });
      } catch (error) {
        console.error("Error fetching session counts:", error);
      }
    };

    fetchData();
  }, []);

  const data = [
    { type: 'Morning', value: sessionCounts.morning },
    { type: 'Evening', value: sessionCounts.evening },
  ];

  return (
    <div className="pie-chart-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: 300, marginLeft: 'auto', marginRight: 20,  marginTop:16}}>
      <CardContent>
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="200"
              cy="240"
              outerRadius={150}
              innerRadius={50}
              paddingAngle={2}
              cornerRadius={5}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
       </CardContent>
      <div >
        <Typography variant="subtitle1">Colour Index:</Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {data.map((entry, index) => (
            <div key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
              <div style={{ width: 20, height: 20, backgroundColor: COLORS[index], marginRight: 8 }} />
              <Typography variant="body2">{entry.type}</Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SessionPieChart;
