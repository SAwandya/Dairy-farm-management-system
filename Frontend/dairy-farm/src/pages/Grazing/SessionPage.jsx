import React, { useEffect, useState } from 'react';
import { Container, Grid, IconButton, Tooltip } from '@mui/material';
import { AddCircleOutline, Edit, Delete } from '@mui/icons-material';
import Table from '../../components/Grazing/GrazingTable';
import GrazingSideBar from '../../components/Grazing/GrazingSideBar';
import axios from 'axios';
import Swal from 'sweetalert2';
import SessionForm from '../../components/Grazing/SessionForm';



function SessionPage() {
  const [dataList, setDataList] = useState([]);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/sessions'); // Correct endpoint
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
      const response = await axios.delete(`http://localhost:3000/api/sessions/${id}`); // Correct endpoint
      if (response.status === 200) {
        fetchData();
        Swal.fire({
          title: 'Deleted!',
          text: 'The session detail has been deleted.',
          icon: 'success'
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete the session detail.',
          icon: 'error'
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
  };

  const handleEdit = (id) => {
    const editData = dataList.find(item => item._id === id);
    setEditFormData(editData);
    setOpenFormDialog(true);
  };

  const handleNewSessionSubmit = async (newSessionData) => {
    try {
      const response = editFormData ?
        await axios.put(`http://localhost:3000/api/sessions/${editFormData._id}`, newSessionData) :
        await axios.post('http://localhost:3000/api/sessions', newSessionData);

      if (response.status === 200 || response.status === 201) {
        fetchData();
        const actionMessage = editFormData ? 'updated' : 'added';
        Swal.fire({
          title: 'Success!',
          text: `Session detail ${actionMessage} successfully.`,
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: `Failed to ${editFormData ? 'update' : 'add'} session detail.`,
          icon: 'error',
        });
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
    'Type of Session',
    'Grazing Area',
    'Cow Batch',
    'Assigned Employee',
    'Grazing Duration',
    'Onsite Feeding Duration',
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
          <Grid item xs={12} style={{ width: '100%',marginTop: '1rem', marginRight: '1rem', marginLeft: '3rem', display: 'flex', justifyContent: 'right' }}>
            <Table
              headers={headers}
              rows={dataList.map((item) => ({
                'Date': new Date(item.date).toLocaleDateString(),
                'Time': item.time,
                'Type of Session': item.typeOfSession,
                'Grazing Area': item.grazingArea,
                'Cow Batch': item.cowBatch,
                'Assigned Employee': item.assignedEmployee,
                'Grazing Duration': item.grazingDuration,
                'Onsite Feeding Duration': item.onsiteFeedingDuration,
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
