import React, { useEffect, useState } from 'react';
import { Container, Button, Grid } from '@mui/material';
import Table from '../../components/Grazing/Table';
import GrazingSideBar from '../../components/Grazing/GrazingSideBar';
import axios from 'axios';
import Swal from 'sweetalert2';
import PastureForm from '../../components/Grazing/PastureForm'; // Import the PastureForm component

axios.defaults.baseURL = 'http://localhost:3000/api/pastureDetails';

function PasturePage() {
  const [dataList, setDataList] = useState([]);
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const getFetchData = async () => {
    try {
      const response = await axios.get('/retrieve');
      if (response.data.success) {
        setDataList(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Please try again later.');
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const deleteResponse = await axios.delete(`/delete/${id}`);
      if (deleteResponse.data.success) {
        getFetchData();
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success'
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete the file.',
          icon: 'error'
        });
      }
    } catch (error) {
      console.error('Error deleting pasture:', error);
      alert('Error deleting pasture. Please try again later.');
    }
  };

  const handleNewPastureSubmit = async (newPastureData) => {
    try {
      const response = await axios.post('/create', newPastureData);
      if (response.data.success) {
        getFetchData();
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
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <GrazingSideBar sx={{ marginRight: '2rem' }} />
        <Grid container spacing={3} justifyContent="center" style={{ width: '100%' }}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button variant="contained" color="primary" onClick={() => setOpenFormDialog(true)}>Add New Pasture Block</Button>
          </Grid>
          <div className="table" style={{ maxWidth: '80%', margin: '0 auto' }}>
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
                    <button onClick={() => handleDelete(item._id)} style={{ color: 'red' }}>
                      Delete
                    </button>
                  </div>
                ),
              }))}
            />
          </div>
        </Grid>
        <PastureForm
          open={openFormDialog}
          handleClose={() => setOpenFormDialog(false)}
          handleSubmit={handleNewPastureSubmit}
        />
      </Container>
    </div>
  );
}

export default PasturePage;
