import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SalesTitle from "./SalesTitle";
import Button from "@mui/material/Button";
import useGameQueryStore from "../../store";
import { Link } from "react-router-dom";
import publishService from "../../services/Sales/publishService";
import useCustomers from "../../hooks/useCustomers";
import approveService from "../../services/Sales/approveService";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import userService from "../../services/Sales/userService";
import MessagePop from "./MessagePop";
import Swal from "sweetalert2";

function preventDefault(event) {
  event.preventDefault();
}

const CustomerList = () => {
  const { data, error, isLoading, refetch } = useCustomers();

  const [opennotify, setOpennotify] = React.useState(false);

  const [selectedId, setSelecetId] = React.useState(null);

  const SetSelectedProductUpdate = useGameQueryStore(
    (s) => s.SetSelectedProductUpdate
  );

  const SetSelectedProductPublish = useGameQueryStore(
    (s) => s.SetSelectedProductPublish
  );

  const handleUpdate = (id) => {
    SetSelectedProductUpdate(id);
  };

  const handleApprove = (id, approvel) => {
    const Approvedata = { approvel: approvel };

    let approvetext = "";
    if (approvel == false) {
      approvetext = "reject";
    } else {
      approvetext = "approve";
    }
    Swal.fire({
      title: `Are you want ${approvetext} this customer?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Added!",
          text: "Customer has been approved",
          icon: "success",
        });

        approveService
          .Approve(id, Approvedata)
          .then((res) => {
            console.log(res.data);
            console.log("success");
            refetch();
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  };

  const handleDelete = (customerId) => {
    console.log("submited");
    setSelecetId(customerId);
    setOpennotify(true);
  };

  const handleDeleteConfirm = () => {
    userService
      .delete(selectedId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <SalesTitle>Customers</SalesTitle>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>address</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>license No </TableCell>
            <TableCell align="right">Rep</TableCell>
            <TableCell>email</TableCell>
            <TableCell>Approve</TableCell>
            <TableCell>Cancel</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((customer) => (
            <TableRow key={customer._id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.address}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.licenseNo}</TableCell>
              <TableCell align="right">{customer.rep}</TableCell>
              <TableCell>{customer.email}</TableCell>

              <TableCell>
                {customer.approvel == false ? (
                  <Button
                    onClick={() => handleApprove(customer._id, true)}
                    variant="contained"
                    size="medium"
                    color="success"
                  >
                    Approve
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleApprove(customer._id, false)}
                    variant="outlined"
                    size="medium"
                    color="error"
                  >
                    Cancel
                  </Button>
                )}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleDelete(customer._id)}
                  variant="outlined"
                  size="medium"
                  color="error"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isLoading ? (
        <Box sx={{ width: 1100 }}>
          <Skeleton sx={{ height: 80, marginTop: -1 }} />
          <Skeleton sx={{ height: 80, marginTop: -3 }} animation="wave" />
          <Skeleton sx={{ height: 80, marginTop: -3 }} animation="wave" />
          <Skeleton sx={{ height: 80, marginTop: -3 }} animation={false} />
          <Skeleton sx={{ height: 80, marginTop: -3 }} animation={false} />
        </Box>
      ) : null}
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>

      <MessagePop
        opennotify={opennotify}
        setOpennotify={setOpennotify}
        refetch={refetch}
        handlefunction={handleDeleteConfirm}
      />
    </>
  );
};

export default CustomerList;
