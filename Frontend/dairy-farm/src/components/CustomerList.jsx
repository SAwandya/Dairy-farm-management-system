import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SalesTitle from "./SalesTitle";
import Button from "@mui/material/Button";
import useGameQueryStore from "../store";
import { Link } from "react-router-dom";
import publishService from "../services/publishService";
import useCustomers from "../hooks/useCustomers";
import approveService from "../services/approveService";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

const CustomerList = () => {
  const { data, error, isLoading, refetch } = useCustomers();

  const SetSelectedProductUpdate = useGameQueryStore(
    (s) => s.SetSelectedProductUpdate
  );

  const SetSelectedProductPublish = useGameQueryStore(
    (s) => s.SetSelectedProductPublish
  );

  console.log(data);

  const handleUpdate = (id) => {
    SetSelectedProductUpdate(id);
  };

  const handleApprove = (id, approvel) => {
    
    const Approvedata = { approvel: approvel };

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
  };

  return (
    <React.Fragment>
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
                    variant="outlined"
                    size="medium"
                    color="error"
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
                <Button variant="outlined" size="medium" color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
};

export default CustomerList;
