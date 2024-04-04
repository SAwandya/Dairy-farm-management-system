import React, { useEffect, useState } from "react";
import { CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F'];

function BreedPieChart() {
  const [pregnantCount, setPregnantCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    //pregnant count
    const fetchPregnantCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/exmAnim/count-pregnancy-check');
        if (response.data.success) {
          setPregnantCount(response.data.count);
        }
      } catch (error) {
        console.error("Error fetching pregnant count:", error);
      }
    };

   
    const fetchTotalCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/animalReg/count-females');
        if (response.data.success) {
          setTotalCount(response.data.count);
        }
      } catch (error) {
        console.error("Error fetching total count:", error);
      }
    };

    fetchPregnantCount();
    fetchTotalCount();
  }, []);

  const data = [
    { name: 'Pregnant', value: pregnantCount },
    { name: 'Non-Pregnant', value: totalCount - pregnantCount }, 
  ];

  return (
    <div className="pie-chart-container" style={{ width: '100%', height: 300, marginLeft: 'auto', marginRight: 20 }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Pregnancy Status
        </Typography>
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'left' ,marginTop:'-120px',marginLeft:'20px'}}>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={120} 
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </CardContent>
    </div>
  );
}

export default BreedPieChart;
