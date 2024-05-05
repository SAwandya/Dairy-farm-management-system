import React from 'react';
import axios from 'axios'; 
import RotationCard from '../../components/Grazing/RotationCard';
import { Container, Box } from '@mui/material';
import GrazingSideBar from '../../components/Grazing/GrazingSideBar';
import Name from '../../components/Grazing/Name';
import NewTable from '../../components/Grazing/NewTable';
import AlarmSetter from '../../components/Grazing/AlarmSetter';

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
