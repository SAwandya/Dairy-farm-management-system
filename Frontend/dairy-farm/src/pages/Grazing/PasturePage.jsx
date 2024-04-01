import React, { useEffect, useState } from 'react';
import { Container, Button, Grid, Card, CardContent } from '@mui/material';
import Table from '../../components/Grazing/Table';
import GrazingSideBar from '../../components/Grazing/GrazingSideBar';
import axios from 'axios';
import Swal from 'sweetalert2';
import PastureForm from '../../components/Grazing/PastureForm'; // Import the PastureForm component

axios.defaults.baseURL = 'http://localhost:3000/api/pastureDetails';

function PasturePage() {
  const [dataList, setDataList] = useState([]);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [editFormData, setEditFormData] = useState(null); // State to hold data for editing

  const fetchData = async () => {
    try {
      const response = await axios.get('/');
      setDataList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch data. Please try again later.',
        icon: 'error',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/delete/${id}`);
      if (response.status === 200) {
        fetchData();
        Swal.fire({
          title: 'Deleted!',
          text: 'The pasture detail has been deleted.',
          icon: 'success'
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete the pasture detail.',
          icon: 'error'
        });
      }
    } catch (error) {
      console.error('Error deleting pasture:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete pasture detail. Please try again later.',
        icon: 'error',
      });
    }
  };

  const handleEdit = (id) => {
    const editData = dataList.find(item => item._id === id);
    setEditFormData(editData);
    setOpenFormDialog(true);
  };

  const handleNewPastureSubmit = async (newPastureData) => {
    try {
      const response = await axios.post('/add', newPastureData);
      if (response.status === 201) {
        fetchData();
        Swal.fire({
          title: 'Success!',
          text: 'New pasture block added successfully.',
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add new pasture block.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error adding new pasture block:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add new pasture block. Please try again later.',
        icon: 'error',
      });
    }
  };

  const headers = [
    'Area',
    'Fertilizer Used',
    'Feeding Capacity',
    'Assigned Employee',
    'Type of Plants Planted',
    'Action',
  ];

  return (
    <div>
      
      <Container
        className="main-container"
        sx={{
          display: 'flex',
          
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        < GrazingSideBar sx={{ display: 'flex', left: 0, top: 0 }} />
        
        <Grid   container spacing={3} justifyContent="center" style={{ width: '80%',marginRight: '1rem' }}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenFormDialog(true)}
              style={{ position: 'absolute', top: 0, right: 0, marginTop: '1rem', marginRight: '1rem' }}
            >
              Add New Pasture Block
            </Button>
          </Grid>
          <Grid item xs={100} style={{marginTop: '1rem', marginRight: '1rem' ,display: 'flex', justifyContent: 'center' }}>
            <Card >
              <CardContent>
                <Table
                  headers={headers}
                  rows={dataList.map((item) => ({
                    'Area': item.area,
                    'Fertilizer Used': item.fertilizerUsed,
                    'Feeding Capacity': item.feedingCapacity,
                    'Assigned Employee': item.assignedEmployee,
                    'Type of Plants Planted': item.typeOfPlantsPlanted,
                    'Action': (
                      <div>
                        <Button onClick={() => handleEdit(item._id)} variant="outlined" color="primary">
                          Edit
                        </Button>
                        <Button onClick={() => handleDelete(item._id)} variant="outlined" color="secondary">
                          Delete
                        </Button>
                      </div>
                    ),
                  }))}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
    
        
        <PastureForm
          open={openFormDialog}
          handleClose={() => setOpenFormDialog(false)}
          handleSubmit={handleNewPastureSubmit}
          initialData={editFormData}
        />
      </Container>
    </div>
  );
}

export default PasturePage;
