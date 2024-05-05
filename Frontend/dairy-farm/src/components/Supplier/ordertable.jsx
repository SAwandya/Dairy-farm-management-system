import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Swal from "sweetalert2";
import axios from "axios";
import AddOrderDialog from "./AddOrderDialog";
import UpdateOrderDialog from "./UpdateOrderDialog";
import { InputLabel } from '@mui/material';
import TablePagination from '@material-ui/core/TablePagination';
import OrderStatusDistributionChart from './OrderStatusDistributionChart';



const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "'Poppins', sans-serif",
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
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [validationErrors, setValidationErrors] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [newRow, setNewRow] = useState({});
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchOrders();
    fetchSuppliers();
    fetchItemTypes();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/order");
      setOrders(response.data.reverse());
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/supplier");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const fetchItemTypes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/item");
      setItemTypes(response.data);
    } catch (error) {
      console.error("Error fetching item types:", error);
    }
  };

  const handleClickOpen = (row) => {
    setCurrentRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    const { isValid, errors } = validateForm(currentRow);
    if (!isValid) {
      setValidationErrors(errors);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deliveryDate = new Date(currentRow.deliveryDate);
    deliveryDate.setHours(0, 0, 0, 0);

    if (deliveryDate < today) {
      handleClose();
      Swal.fire("Error", "Delivery date cannot be a date in the past", "error");
      return;
    }

    if (currentRow.quantity < 0 || currentRow.advanceFee < 0) {
      handleClose();
      Swal.fire(
        "Error",
        "Quantity and Advance Fee cannot be negative",
        "error"
      );
      return;
    }

    try {
      const { _id, __v, ...updateData } = currentRow;
      const response = await axios.put(
        `http://localhost:3000/api/order/${currentRow._id}`,
        updateData
      );
      console.log(response.data);
      setOpen(false);
      Swal.fire("Success", "Order updated successfully", "success");
      fetchOrders();
    } catch (error) {
      console.error("An error occurred:", error);
      Swal.fire("Error", "An error occurred while updating the order", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/api/order/${id}`);
          Swal.fire("Deleted!", "Your order has been deleted.", "success");
          fetchOrders();
        } catch (error) {
          console.error("An error occurred:", error);
          Swal.fire(
            "Error",
            "An error occurred while deleting the order",
            "error"
          );
        }
      }
    });
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleAdd = async () => {
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
      handleCloseAdd();
      Swal.fire("Error", "Delivery date cannot be a date in the past", "error");
      return;
    }

    if (newRow.quantity < 0 || newRow.advanceFee < 0) {
      handleCloseAdd();
      Swal.fire(
        "Error",
        "Quantity and Advance Fee cannot be negative",
        "error"
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/order", {
        ...newRow,
        _id: undefined,
        orderStatus: "Pending",
      });
      console.log(response.data);
      setOpenAdd(false);
      Swal.fire("Success", "Order added successfully", "success");
      fetchOrders();
    } catch (error) {
      console.error("An error occurred:", error);
      Swal.fire("Error", "An error occurred while adding the order", "error");
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = orders?.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const validateForm = (row) => {
    let errors = {};
    let isValid = true;

    const requiredFields = [
      "orderType",
      "supplierName",
      "quantity",
      "advanceFee",
      "deliveryDate",
    ];

    requiredFields.forEach((field) => {
      if (!row[field]) {
        errors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
        isValid = false;
      }
    });

    return { isValid, errors };
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
            {filteredData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={row._id || index} className={classes.row}>
                <TableCell style={{ display: "none" }}>{row._id}</TableCell>
                <TableCell>
                  {
                    itemTypes.find((item) => item._id === row.orderType)
                      ?.itemName
                  }
                </TableCell>
                <TableCell>{row.supplierName}</TableCell>
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <AddOrderDialog
          open={openAdd}
          handleClose={handleCloseAdd}
          handleAdd={handleAdd}
          newRow={newRow}
          setNewRow={setNewRow}
          suppliers={suppliers}
          itemTypes={itemTypes}
          validationErrors={validationErrors}
        />
        <UpdateOrderDialog
          open={open}
          handleClose={handleClose}
          handleUpdate={handleUpdate}
          currentRow={currentRow}
          setCurrentRow={setCurrentRow}
          suppliers={suppliers}
          itemTypes={itemTypes}
          validationErrors={validationErrors}
        />
      </TableContainer>
    </div>
  );
};
export default OrderTable;
