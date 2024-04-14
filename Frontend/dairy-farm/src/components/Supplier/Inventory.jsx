import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
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

const Inventory = () => {
  const classes = useStyles();
  const { data: pendingOrders, isLoading } = useGetPendingOrders();
  const updateOrderStatus = useUpdateOrderStatus();

  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Supplier</TableCell>
            <TableCell>Approve Order</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingOrders && pendingOrders.map(order => ( 
            <TableRow key={order._id}>
              <TableCell>{order.orderType}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.supplierName}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => updateOrderStatus.mutate(order._id)}
                >
                  Approve Order
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Inventory;

function useGetPendingOrders() {
  return useQuery({
    queryKey: ["pendingOrders"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/order");
      const data = await response.json();
      return data.filter(order => order.orderStatus === "Pending");
    },
    refetchOnWindowFocus: false,
  });
}
function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId) => {
      const orderResponse = await fetch(`http://localhost:3000/api/order/${orderId}`);
      const order = await orderResponse.json();

      // Exclude _id and __v from the order fields
      const { _id, __v, ...orderFields } = order;

      // Update the order status
      const response = await fetch(
        `http://localhost:3000/api/order/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            ...orderFields, // Include all the current order fields except _id and __v
            orderStatus: "Received" // Override the orderStatus
          }),
        }
      );
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries('pendingOrders'); // Invalidate the 'pendingOrders' query to refetch the data
    },
  });
}