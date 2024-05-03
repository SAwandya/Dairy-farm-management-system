import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { makeStyles } from "@material-ui/core/styles";
import  { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import ReduceStockForm from './ReduceStockForm';

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
    <div>
      <div>
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
            {pendingOrders && pendingOrders.map(order => {
              return (
                <TableRow key={order._id}>
                  <TableCell>{order.item.itemName}</TableCell>
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
              );
            })}
          </TableBody>
        </Table>
    </TableContainer>
      </div>
      <div>
        <ReduceStockForm />
      </div>
    </div>


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
    queryKey: ["pendingOrders"],
    mutationFn: async (orderId) => {
      try {
        const orderResponse = await fetch(`http://localhost:3000/api/order/${orderId}`);
        const order = await orderResponse.json();

        const { _id, __v, ...orderFields } = order;

        const itemResponse = await fetch(`http://localhost:3000/api/item/${order.orderType}`);
        const item = await itemResponse.json();

        const response = await fetch(
          `http://localhost:3000/api/order/${orderId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              ...orderFields, 
              orderStatus: "Received" 
            }),
          }
        );

        const inventoryResponse = await fetch(
          `http://localhost:3000/api/inventory`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              itemName: item.itemName,
              quantity: orderFields.quantity
            }),
          }
        );

        return response.json();
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('pendingOrders');
    },
  });
}