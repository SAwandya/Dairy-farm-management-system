import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, IconButton, Tooltip } from '@mui/material';
import { AddCircleOutline, Edit, Delete } from '@mui/icons-material';
import EffluentTable from '../../components/Grazing/EffluentTable';
import axios from 'axios';
import Swal from 'sweetalert2';
import EffluentForm from '../../components/Grazing/EffluentForm';
import GrazingSideBar from '../../components/Grazing/GrazingSideBar';

function EffluentPage() {
  const [dataList, setDataList] = useState([]);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/effluentRoutes');
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
      const response = await axios.delete(`http://localhost:3000/api/effluentRoutes/delete/${id}`);
      if (response.status === 200) {
        fetchData();
        Swal.fire({
          title: 'Deleted!',
          text: 'The effluent detail has been deleted.',
          icon: 'success'
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete the effluent detail.',
          icon: 'error'
        });
      }
    } catch (error) {
      console.error('Error deleting effluent:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete effluent detail. Please try again later.',
        icon: 'error',
      });
    }
  };

  const handleEdit = (id) => {
    const editData = dataList.find(item => item._id === id);
    setEditFormData(editData);
    setOpenFormDialog(true);
  };

  const handleNewEffluentSubmit = async (newEffluentData) => {
    try {
      if (editFormData) {
        const response = await axios.put(`http://localhost:3000/api/effluentRoutes/update/${editFormData._id}`, newEffluentData);
        if (response.status === 200) {
          fetchData();
          Swal.fire({
            title: 'Success!',
            text: 'Effluent detail updated successfully.',
            icon: 'success',
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to update effluent detail.',
            icon: 'error',
          });
        }
      } else {
        const response = await axios.post('http://localhost:3000/api/effluentRoutes/add', newEffluentData);
        if (response.status === 201) {
          fetchData();
          Swal.fire({
            title: 'Success!',
            text: 'New effluent detail added successfully.',
            icon: 'success',
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to add new effluent detail.',
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
    'Date',
    'Grazing Area',
    'Amount of Waste Collected (kg)',
    'Type of Waste',
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
        <Grid container spacing={2} justifyContent="center" style={{ width: '100%', marginRight: '3rem', marginLeft: '8rem' }}>
          <Grid item xs={12}>
            <Grid container justifyContent="flex-end">
              <Tooltip title="Add New Effluent Detail">
                <IconButton
                  onClick={() => setOpenFormDialog(true)}
                  style={{ marginTop: '1rem', marginRight: '1rem' }}
                >
                  <AddCircleOutline color="primary" fontSize="large" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '1rem', marginRight: '1rem', marginLeft: '2rem', display: 'flex', justifyContent: 'right', width: '100%' }}>
            <Card>
              <CardContent>
                <EffluentTable
                  headers={headers}
                  rows={dataList.map((item) => ({
                    'Date': new Date(item.date).toLocaleDateString(),
                    'Grazing Area': item.grazingArea,
                    'Amount of Waste Collected (kg)': item.wasteCollected,
                    'Type of Waste': item.wasteType,
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
        <EffluentForm
          open={openFormDialog}
          handleClose={() => setOpenFormDialog(false)}
          handleSubmit={handleNewEffluentSubmit}
          initialData={editFormData}
        />
      </Container>
    </div>
  );
}

export default EffluentPage;
