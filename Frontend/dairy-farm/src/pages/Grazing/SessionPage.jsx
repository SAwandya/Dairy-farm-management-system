import React, { useEffect, useState } from 'react';
import { Container, Grid, IconButton, Tooltip, Box, Typography } from '@mui/material';
import { AddCircleOutline, Edit, Delete } from '@mui/icons-material';
import Table from '../../components/Grazing/GrazingTable';
import GrazingSideBar from '../../components/Grazing/GrazingSideBar';
import axios from 'axios';
import Swal from 'sweetalert2';
import SessionForm from '../../components/Grazing/SessionForm';
import Name from '../../components/Grazing/Name';
import GrazingDate from '../../components/Grazing/GrazingDate';

function SessionPage() {
  const [dataList, setDataList] = useState([]);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/sessions'); 
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
    // SweetAlert confirmation for delete
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/sessions/${id}`); // by id
        if (response.status === 200) {
          fetchData();
          Swal.fire({
            title: 'Deleted!',
            text: 'The session detail has been deleted.',
            icon: 'success',
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete the session detail.',
            icon: 'error',
          });
        }
      } catch (error) {
        console.error('Error deleting session:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete session detail. Please try again later.',
          icon: 'error',
        });
      }
    }
  };

  const handleEdit = async (id) => {
    const confirmUpdate = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to update the session details.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
    });

    if (confirmUpdate.isConfirmed) {
      const editData = dataList.find(item => item._id === id);
      setEditFormData(editData);
      setOpenFormDialog(true);
    }
  };

  const handleNewSessionSubmit = async (newSessionData) => {
    try {
      if (editFormData) {
        const response = await axios.put(`http://localhost:3000/api/sessions/${editFormData._id}`, newSessionData);
        if (response.status === 200) {
          fetchData();
          Swal.fire({
            title: 'Success!',
            text: 'Session detail updated successfully.',
            icon: 'success',
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to update session detail.',
            icon: 'error',
          });
        }
      } else {
        const response = await axios.post('http://localhost:3000/api/sessions', newSessionData);
        if (response.status === 201) {
          fetchData();
          Swal.fire({
            title: 'Success!',
            text: 'New session detail added successfully.',
            icon: 'success',
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to add new session detail.',
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
    'Time',
    'Session',
    'Grazing Area',
    'Cow Batch',
    'Assigned Employee',
    'Grazing Duration(hours)',
    'Walking Duration(hours)',
    'Action',
  ];

  return (
    <div>
      <Box className="dashboard-content">
        <div align='center'></div>
        <GrazingDate />
        <Name />
        <Typography> Information regarding scheduling sessions is recorded here</Typography>
      </Box>
      <GrazingSideBar sx={{ position: 'fixed', left: 0, top: 0, height: '100vh' }} />
      <Container
        className="main"
        sx={{
          display: 'flex',
          alignItems: 'right',
          justifyContent: 'right',
        }}
      >
        <Grid container spacing={1} justifyContent="center" style={{ width: '100%', marginRight: '2rem', marginLeft: '7rem' }}>
          <Grid item xs={12}>
            <Grid container justifyContent="flex-end">
              <Tooltip title="Add New Session">
                <IconButton
                  onClick={() => setOpenFormDialog(true)}
                  style={{ marginTop: '1rem', marginRight: '1rem' }}
                >
                  <AddCircleOutline color="primary" fontSize="large" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ width: '100%', marginTop: '1rem', marginLeft: '1rem', display: 'flex', justifyContent: 'center' }}>
            <Table
              headers={headers}
              rows={dataList.map((item) => ({
                'Date': new Date(item.date).toLocaleDateString(),
                'Time': item.time,
                'Session': item.typeOfSession,
                'Grazing Area': item.grazingArea,
                'Cow Batch': item.cowBatch,
                'Assigned Employee': item.assignedEmployee,
                'Grazing Duration(hours)': item.grazingDuration,
                'Walking Duration(hours)': item.onsiteFeedingDuration,
                'Action': (
                  <Box display="flex">
                    <IconButton onClick={() => handleEdit(item._id)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item._id)}>
                      <Delete style={{ color: 'red' }} />
                    </IconButton>
                  </Box>
                ),
              }))}
            />
          </Grid>
        </Grid>
        <SessionForm
          open={openFormDialog}
          handleClose={() => setOpenFormDialog(false)}
          handleSubmit={handleNewSessionSubmit}
          initialData={editFormData}
        />
      </Container>
    </div>
  );
}

export default SessionPage;
