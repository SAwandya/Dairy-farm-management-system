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
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FormHelperText } from '@mui/material';


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



const OrderTable = () => {
  const classes = useStyles();

  const [selectedSupplierName, setSelectedSupplierName] = useState('');

  const handleSupplierChange = (event) => {
    setSelectedSupplierName(event.target.value);
  };

  const validateForm = (row) => {
    let errors = {};
    let isValid = true;
  
    // Check for null or empty fields
    const requiredFields = [
      'orderType',
      'supplierName',
      'quantity',
      'advanceFee',
      'deliveryDate',
    ];
  
    requiredFields.forEach(field => {
      if (!row[field]) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        isValid = false;
      }
    });
  
    return { isValid, errors };
  };
  

  const [suppliers, setSuppliers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/supplier')
      .then(response => response.json())
      .then(data => {
        setSuppliers(data);
      });
  }, []);


  const [itemTypes, setItemTypes] = useState([]);
  useEffect(() => {
  fetch('http://localhost:3000/api/item')
    .then(response => response.json())
    .then(data => setItemTypes(data));
  }, []);

  const [open, setOpen] = React.useState(false);
  const [currentRow, setCurrentRow] = React.useState(null);
  const [validationErrors, setValidationErrors] = React.useState(null);
  const { mutate } = useUpdateOrder();

  const [openAdd, setOpenAdd] = React.useState(false);
  const [newRow, setNewRow] = React.useState({});
  const mutationAdd = useCreateOrder();
  const mutationDelete = useDeleteOrder();
  const { data, isLoading, isError } = useGetOrders();
  const [search, setSearch] = React.useState("");

  const handleClickOpen = (row) => {
    setCurrentRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {

    const { isValid, errors } = validateForm(currentRow);
    if (!isValid) {
      setValidationErrors(errors);
      return;
    }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deliveryDate = new Date(newRow.deliveryDate);
  deliveryDate.setHours(0, 0, 0, 0);


  if (deliveryDate < today) {
    handleClose();
    Swal.fire('Error', 'Delivery date cannot be a date in the past', 'error');
    return;
  }
  
  if (currentRow.quantity < 0 || currentRow.advanceFee < 0) {
    handleClose();
    Swal.fire('Error', 'Quantity and Advance Fee cannot be negative', 'error');
    return;
  }
    let data = { ...currentRow, __v: undefined };

    console.log(data);

    mutate(data, {
      onSuccess: () => {
        setOpen(false);
        Swal.fire('Success', 'Order updated successfully', 'success');
      },
      onError: (error) => {
        console.error("An error occurred:", error);
        Swal.fire('Error', 'An error occurred while updating the order', 'error');
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
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
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

    const { isValid, errors } = validateForm(newRow);
    if (!isValid) {
      setValidationErrors(errors);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deliveryDate = new Date(newRow.deliveryDate);
    deliveryDate.setHours(0, 0, 0, 0);

    if (deliveryDate < today) {
      handleCloseAdd()
      Swal.fire('Error', 'Delivery date cannot be a date in the past', 'error');
      return;
    }

    if (newRow.quantity < 0 || newRow.advanceFee < 0) {
      handleCloseAdd()
      Swal.fire('Error', 'Quantity and Advance Fee cannot be negative', 'error');
      return;
    }
    mutationAdd.mutate(newRow, {
      onSuccess: () => {
        console.log(newRow);
        setOpenAdd(false);
        Swal.fire('Success', 'Order added successfully', 'success');
      },
      onError: (error) => {
        console.error("An error occurred:", error);
        Swal.fire('Error', 'An error occurred while adding the order', 'error');
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
        <Typography variant="h6">Orders</Typography>

        <div div className={classes.root}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleClickOpenAdd}
            className={classes.addButton}
          >
            Add Order
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
              <TableCell style={{ display: "none" }}>ID</TableCell>
              <TableCell>Order Type</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Advance Fee(LKR)</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((row, index) => (
              <TableRow key={row._id || index} className={classes.row}>
                <TableCell style={{ display: "none" }}>{row._id}</TableCell>
                <TableCell>
                  {itemTypes.find(item => item._id === row.orderType)?.itemName}
                  {/* {row.orderType} */}
                </TableCell>
                <TableCell>
                  {/* {suppliers.find(supplier => supplier.supplierName === row.supplier)?.supplierName} */}
                  {row.supplierName}
                </TableCell>
                <TableCell>{row.orderStatus}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.advanceFee}</TableCell>
                <TableCell>{row.deliveryDate.substring(0, 10)}</TableCell>
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
        <Dialog
          open={openAdd}
          onClose={handleCloseAdd}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Order</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel id="orderType-label">Order Type</InputLabel>
              <Select
                labelId="orderType-label"
                id="orderType"
                value={newRow.orderType}
                onChange={(e) => setNewRow({ ...newRow, orderType: e.target.value })}
              >
                {itemTypes.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.itemName}
                  </MenuItem>
                ))}
              </Select>
              {validationErrors?.orderType && <FormHelperText>{validationErrors?.orderType}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth margin="dense">
              <InputLabel id="supplier-label">Supplier</InputLabel>
              <Select
                labelId="supplier-label"
                id="supplier"
                value={newRow.supplierName}
                onChange={(e) => setNewRow({ ...newRow, supplierName: e.target.value })}
              >
                {suppliers.map((supplier) => (
                  <MenuItem key={supplier._id} value={supplier.name}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </Select>
              {validationErrors?.supplierName && <FormHelperText>{validationErrors?.supplierName}</FormHelperText>}
            </FormControl>

            <TextField
              error={!!validationErrors?.quantity}
              helperText={validationErrors?.quantity}
              margin="dense"
              id="quantity"
              label="Quantity"
              type="number"
              fullWidth
              onChange={(e) =>
                setNewRow({ ...newRow, quantity: e.target.value })
              }
            />
            <TextField
              error={!!validationErrors?.advanceFee}
              helperText={validationErrors?.advanceFee}
              margin="dense"
              id="advanceFee"
              label="Advance Fee"
              type="number"
              fullWidth
              onChange={(e) =>
                setNewRow({ ...newRow, advanceFee: e.target.value })
              }
            />
            <TextField
              error={!!validationErrors?.deliveryDate}
              helperText={validationErrors?.deliveryDate}
              margin="dense"
              id="deliveryDate"
              label="Delivery Date"
              type="date"
              fullWidth
              onChange={(e) =>
                setNewRow({ ...newRow, deliveryDate: e.target.value })
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
          <DialogTitle id="form-dialog-title">Update Order</DialogTitle>
          {validationErrors && (
            <div>
              {Object.entries(validationErrors).map(([key, value]) => (
                <p key={key} style={{ color: "red", paddingLeft: "25px" }}>
                  {value}
                </p>
              ))}
            </div>
          )}
          <DialogContent>
            <FormControl fullWidth>
            <InputLabel id="supplier-label">Order Type</InputLabel>
              <Select
                labelId="orderType-label"
                id="orderType"
                value={currentRow?.orderType}
                onChange={(e) =>{
                  setCurrentRow({ ...currentRow, orderType: e.target.value })
                }
                }
              >
                {itemTypes.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.itemName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel id="supplier-label">Supplier</InputLabel>
              <Select
                labelId="supplier-label"
                id="supplier"
                value={currentRow?.supplier}
                onChange={(e) => setCurrentRow({ ...currentRow, supplierName: e.target.value })}
              >
                {suppliers.map((supplier) => (
                  <MenuItem key={supplier._id} value={supplier.name}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              error={!!validationErrors?.quantity}
              helperText={validationErrors?.quantity}
              margin="dense"
              id="quantity"
              label="Quantity"
              type="number"
              fullWidth
              value={currentRow?.quantity}
              onChange={(e) =>
                setCurrentRow({ ...currentRow, quantity: e.target.value })
              }
            />
            <TextField
              error={!!validationErrors?.quantity}
              helperText={validationErrors?.quantity}
              margin="dense"
              id="advanceFee"
              label="Advance Fee"
              type="number"
              fullWidth
              value={currentRow?.advanceFee}
              onChange={(e) =>
                setCurrentRow({ ...currentRow, advanceFee: e.target.value })
              }
            />
            <TextField
              margin="dense"
              id="deliveryDate"
              label="Delivery Date"
              type="date"
              fullWidth
              value={currentRow?.deliveryDate}
              onChange={(e) =>
                setCurrentRow({ ...currentRow, deliveryDate: e.target.value })
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


function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (order) => {
      const response = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...order,
          _id: undefined,
          orderStatus: "Pending",
        }),
      });
      return response.json();
    },
    onMutate: (newOrderInfo) => {
      queryClient.setQueryData(["orders"], (prevOrders) => [
        ...prevOrders,
        {
          ...newOrderInfo,
          orderStatus: "Pending",
        },
      ]);
    },
  });
}

function useGetOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/order");
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
}

function useUpdateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    queryKey: ["orders"],
    mutationFn: async (order) => {
      const response = await fetch(
        `http://localhost:3000/api/order/${order._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...order, _id: undefined }),
        }
      );
      console.log(order);
      return response.json();
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["orders"], (old) =>
        old?.map((d) => (d._id === variables._id ? data : d))
      );
    },
  });
}


function useDeleteOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId) => {
      const response = await fetch(
        `http://localhost:3000/api/order/${orderId}`,
        {
          method: "DELETE",
        }
      );
      return response.json();
    },
    onMutate: (orderId) => {
      queryClient.setQueryData(["orders"], (prevOrders) =>
        prevOrders?.filter((order) => order._id !== orderId)
      );
    },
  });
}

export default OrderTable;
