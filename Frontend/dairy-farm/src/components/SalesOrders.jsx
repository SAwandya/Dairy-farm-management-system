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
import purchaseService from "../services/purchaseService";

const SalesOrders = () => {
  const { data, error, isLoading, refetch } = usePurcahse();

  const handleApprove = (id, approve) => {
    const data = { approve: approve };

    purchaseService
      .Approve(id, data)
      .then((res) => {
        refetch()
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <React.Fragment>
      <SalesTitle>Recent Orders</SalesTitle>
      <Table size="small">
        <TableHead>
          <TableRow>
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
              <TableCell>{purchase.product.name}</TableCell>
              <TableCell>{purchase.quantity}</TableCell>
              <TableCell>{purchase.customer.name}</TableCell>
              <TableCell align="right">
                {`$${purchase.product.price * purchase.quantity * 100}`}
              </TableCell>
              <TableCell>
                {!purchase.approve ? (
                  <Button
                    variant="contained"
                    onClick={() => handleApprove(purchase._id, true)}
                    size="medium"
                    color="success"
                  >
                    Approve
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => handleApprove(purchase._id, false)}
                    size="medium"
                    color="error"
                  >
                    Reject
                  </Button>
                )}
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
      <Link color="primary" href="#" sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
};

export default SalesOrders;
