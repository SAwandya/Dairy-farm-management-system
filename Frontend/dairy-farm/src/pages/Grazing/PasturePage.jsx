import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, IconButton, Tooltip } from '@mui/material';
import { AddCircleOutline, Edit, Delete } from '@mui/icons-material';
import GrazingTable from '../../components/Grazing/GrazingTable';
import GrazingSideBar from '../../components/Grazing/GrazingSideBar';
import axios from 'axios';
import Swal from 'sweetalert2';
import PastureForm from '../../components/Grazing/PastureForm';

function PasturePage() {
  const [dataList, setDataList] = useState([]);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/pastureDetails'); // Corrected base URL
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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/pastureDetails/delete/${id}`); // Corrected URL
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
      if (editFormData) {
        const response = await axios.put(`http://localhost:3000/api/pastureDetails/update/${editFormData._id}`, newPastureData); // Corrected URL
        if (response.status === 200) {
          fetchData();
          Swal.fire({
            title: 'Success!',
            text: 'Pasture block updated successfully.',
            icon: 'success',
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to update pasture block.',
            icon: 'error',
          });
        }
      } else {
        const response = await axios.post('http://localhost:3000/api/pastureDetails/add', newPastureData); // Corrected URL
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
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred. Please try again later.',
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
      <GrazingSideBar sx={{ position: 'fixed', left: 0, top: 0, height: '100vh' }} />
      <Container
        className="main-container"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Grid container spacing={2} justifyContent="center" style={{ width: '100%', marginRight: '3rem',marginLeft: '8rem' }}>
          <Grid item xs={12}>
            <Grid container justifyContent="flex-end">
              <Tooltip title="Add New Pasture Block">
                <IconButton
                  onClick={() => setOpenFormDialog(true)}
                  style={{ marginTop: '1rem', marginRight: '1rem' }}
                >
                  <AddCircleOutline color="primary" fontSize="large" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '1rem', marginRight: '1rem', marginLeft: '2rem',display: 'flex', justifyContent: 'right',width:'100%' }}>
            <Card>
              <CardContent>
                <GrazingTable
                  headers={headers}
                  rows={dataList.map((item) => ({
                    'Area': item.area,
                    'Fertilizer Used': item.fertilizerUsed,
                    'Feeding Capacity': item.feedingCapacity,
                    'Assigned Employee': item.assignedEmployee,
                    'Type of Plants Planted': item.typeOfPlantsPlanted,
                    'Action': (
                      <div>
                        <IconButton onClick={() => handleEdit(item._id)} color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(item._id)} color="secondary">
                          <Delete />
                        </IconButton>
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
