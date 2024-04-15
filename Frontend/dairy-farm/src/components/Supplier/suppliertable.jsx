import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import validateForm from "./ValidateForm";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },

  addButton: {
    marginLeft: "auto",
  },
  row: {
    "&:nth-child(odd)": {
      backgroundColor: "#f2f2f2",
    },
    "&:nth-child(even)": {
      backgroundColor: "#e0f7fa",
    },
  },
}));

const SupplierTable = () => {
  const classes = useStyles();

  const [itemTypes, setItemTypes] = useState([]);
  useEffect(() => {
  fetch('http://localhost:3000/api/item')
    .then(response => response.json())
    .then(data => setItemTypes(data));
  }, []);

  const [open, setOpen] = React.useState(false);
  const [currentRow, setCurrentRow] = React.useState(null);
  const [validationErrors, setValidationErrors] = React.useState(null);
  const { mutate } = useUpdateUser();

  const [openAdd, setOpenAdd] = React.useState(false);
  const [newRow, setNewRow] = React.useState({});
  const mutationAdd = useCreateUser();
  const mutationDelete = useDeleteUser();
  const { data, isLoading, isError } = useGetUsers();
  const [search, setSearch] = React.useState("");

  const handleClickOpen = (row) => {
    setCurrentRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    if (currentRow.avgDeliveryTime < 0) {
      handleClose();
      Swal.fire('Error', 'Average Delivery Time cannot be a negative value', 'error');
      return;
    }
    const errors = validateForm(currentRow);
    if (Object.values(errors).some((error) => error)) {
      setValidationErrors(errors);
      return;
    }
  
    let data = { ...currentRow, __v: undefined };
  
    mutate(data, {
      onSuccess: () => {
        setOpen(false);
        Swal.fire('Success', 'Supplier updated successfully', 'success');
      },
      onError: (error) => {
        console.error("An error occurred:", error);
        Swal.fire('Error', 'An error occurred while updating the supplier', 'error');
      },
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        mutationDelete.mutate(id);
        Swal.fire('Deleted!', 'The supplier has been deleted.', 'success')
      }
    })
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleAdd = () => {
    if (newRow.avgDeliveryTime < 0) {
      handleCloseAdd();
      Swal.fire('Error', 'Average Delivery Time cannot be a negative value', 'error');
      return;
    }
    mutationAdd.mutate(newRow, {
      onSuccess: () => {
        setOpenAdd(false);
        Swal.fire('Success', 'Supplier added successfully', 'success');
      },
      onError: (error) => {
        console.error("An error occurred:", error);
        Swal.fire('Error', 'An error occurred while adding the supplier', 'error');
      },
    });
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = data?.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;

  return (
    <div>
      <div className={classes.root}>
        <Typography variant="h6">Suppliers</Typography>

        <div div className={classes.root}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleClickOpenAdd}
            className={classes.addButton}
          >
            Add Supplier
          </Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Toolbar>
          <TextField
            id="search"
            type="search"
            value={search}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          >
            <InputLabel shrink htmlFor="search">
              Search
            </InputLabel>
          </TextField>
        </Toolbar>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ display: "none" }}>Id</TableCell>
              <TableCell>Supplier Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Item Type</TableCell>
              <TableCell>Supplier Type</TableCell>
              <TableCell>Average Delivery</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((row, index) => (
              <TableRow key={row._id} className={classes.row}>
                <TableCell
                  style={{ display: "none" }}
                  component="th"
                  scope="row"
                >
                  {row._id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.itemType}</TableCell>
                <TableCell>{row.supplierType}</TableCell>
                <TableCell>{row.avgDeliveryTime}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleClickOpen(row)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(row._id)}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpenAdd}>
        Add Supplier
      </Button> */}
        <Dialog
          open={openAdd}
          onClose={handleCloseAdd}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Supplier</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Supplier Name"
              type="text"
              fullWidth
              onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              onChange={(e) => setNewRow({ ...newRow, email: e.target.value })}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="itemType-label">Item Type</InputLabel>
              <Select
                labelId="itemType-label"
                id="itemType"
                value={newRow.itemType}
                onChange={(e) => setNewRow({ ...newRow, itemType: e.target.value })}
              >
                {itemTypes.map((item) => (
                  <MenuItem key={item._id} value={item.itemName}>
                    {item.itemName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="supplierType-label">Supplier Type</InputLabel>
              <Select
                labelId="supplierType-label"
                id="supplierType"
                value={newRow.supplierType}
                onChange={(e) =>
                  setNewRow({ ...newRow, supplierType: e.target.value })
                }
              >
                <MenuItem value={"Contracted"}>Contracted</MenuItem>
                <MenuItem value={"Permanent"}>Permanent</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="avgDeliveryTime"
              label="Average Time to Delivery"
              type="number"
              fullWidth
              onChange={(e) =>
                setNewRow({ ...newRow, avgDeliveryTime: e.target.value })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update User</DialogTitle>
          {validationErrors && (
            <div>
              {Object.entries(validationErrors).map(([key, value]) => (
                <p key={key} style={{ color: "red", paddingLeft: "25px"}}>
                  {value}
                </p>
              ))}
            </div>
          )}
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Supplier Name"
              type="text"
              fullWidth
              value={currentRow?.name}
              onChange={(e) =>
                setCurrentRow({ ...currentRow, name: e.target.value })
              }
            />

            <TextField
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              value={currentRow?.email}
              onChange={(e) =>
                setCurrentRow({ ...currentRow, email: e.target.value })
              }
            />
          <FormControl fullWidth margin="dense">
              <InputLabel id="itemType-label">Item Type</InputLabel>
              <Select
                labelId="itemType-label"
                id="itemType"
                value={newRow.itemType}
                onChange={(e) => setCurrentRow({ ...currentRow, itemType: e.target.value })}
              >
                {itemTypes.map((item) => (
                  <MenuItem key={item._id} value={item.itemName}>
                    {item.itemName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="edit-supplierType-label">
                Supplier Type
              </InputLabel>
              <Select
                labelId="edit-supplierType-label"
                id="edit-supplierType"
                value={currentRow?.supplierType}
                onChange={(e) =>
                  setCurrentRow({ ...currentRow, supplierType: e.target.value })
                }
              >
                <MenuItem value={"Contracted"}>Contracted</MenuItem>
                <MenuItem value={"Permanent"}>Permanent</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="avgDeliveryTime"
              label="Average Time to Delivery"
              type="number"
              fullWidth
              value={currentRow?.avgDeliveryTime}
              onChange={(e) =>
                setCurrentRow({ ...currentRow, avgDeliveryTime: e.target.value })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </div>
  );
};

export default SupplierTable;

function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      const response = await fetch("http://localhost:3000/api/supplier", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
          _id: undefined,
          supplierType: user.supplierType,
        }),
      });
      return response.json();
    },
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["users"], (prevUsers) => [
        ...prevUsers,
        {
          ...newUserInfo,
        },
      ]);
    },
  });
}

function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/supplier");
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
}

function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      const response = await fetch(
        `http://localhost:3000/api/supplier/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...user,
            _id: undefined,
            
          }),
        }
      );
      return response.json();
    },
    onMutate: (updatedUser) => {
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser._id === updatedUser._id ? updatedUser : prevUser
        )
      );
    },
  });
}

function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      const response = await fetch(
        `http://localhost:3000/api/supplier/${userId}`,
        {
          method: "DELETE",
        }
      );
      return response.json();
    },
    onMutate: (userId) => {
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.filter((user) => user._id !== userId)
      );
    },
  });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  <QueryClientProvider client={queryClient}>
    <SupplierTable />
  </QueryClientProvider>
);

