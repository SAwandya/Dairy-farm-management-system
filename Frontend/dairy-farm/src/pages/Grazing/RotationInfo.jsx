import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import RotationCard from '../../components/Grazing/RotationCard';
import { Container, Box, Button } from '@mui/material';
import GrazingSideBar from '../../components/Grazing/GrazingSideBar';
import Name from '../../components/Grazing/Name';
import NewTable from '../../components/Grazing/NewTable';

function RotationInfo() {
  const [rotations, setRotations] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:3000/api/sessions') 
      .then(response => {
        setRotations(response.data);
      })
      .catch(error => {
        console.error('Error fetching rotation details:', error);
      });
  }, []);

  return (
    <Box className="main-container" sx={{ display: 'flex', minWidth: '1036px' }}>
      <GrazingSideBar />
      <Box className="dashboard-content2">
        <Box className="dashboard-content">
          <Name/>
          <Box sx={{ position: 'absolute', top: 100, right: 160 }}>
          <Button 
          component={Link} 
          to="/alarm" 
          variant="contained" 
          color="primary" 
          style={{ backgroundColor: '#1a6952' }}
        >
  Set Alarms
</Button>

          </Box>
        </Box>
        <Container sx={{ margin: 16, marginLeft: '250px', marginTop: '20px' }}>
          <RotationCard rotations={rotations} />
        </Container>
        <Container sx={{ margin: 16, marginLeft: '250px', marginTop: '100px' }}>
          <NewTable/>
        </Container>
      </Box>
    </Box>
  );
}

export default RotationInfo;
