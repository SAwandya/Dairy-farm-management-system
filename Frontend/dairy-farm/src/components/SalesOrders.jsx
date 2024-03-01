import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SalesTitle from "./SalesTitle";
import usePurcahse from "../hooks/usePurcahse";
import Button from "@mui/material/Button";

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

const SalesOrders = () => {
  const { data, error, isLoading } = usePurcahse();

  console.log(data);

  return (
    <React.Fragment>
      <SalesTitle>Recent Orders</SalesTitle>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Customer name</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
            <TableCell>Approve</TableCell>
            <TableCell>Cancel</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((purchase) => (
            <TableRow key={purchase._id}>
              <TableCell>{purchase._id}</TableCell>
              <TableCell>{purchase.product.name}</TableCell>
              <TableCell>{purchase.quantity}</TableCell>
              <TableCell>{purchase.customer.name}</TableCell>
              <TableCell align="right">
                {`$${purchase.product.price * purchase.quantity * 100}`}
              </TableCell>
              <TableCell>
                <Button variant="contained" size="medium" color="success">
                  Approve
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined" size="medium" color="error">
                  Cancel
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

export default SalesOrders;
