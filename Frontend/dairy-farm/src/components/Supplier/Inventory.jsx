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
import { Link } from 'react-router-dom';

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
  const { data: lowStockItems } = useGetLowStockItems();


  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h2>Pending Orders</h2> <br/>
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
      </div><br/>
      {/* <div>
        <ReduceStockForm />
      </div> */}
      <div>
        {lowStockItems && lowStockItems.length > 0 && (
          <div>
            <br/>
            <h2>Low Stocks Items</h2><br/>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Current Quantity</TableCell>
                    <TableCell>Reorder</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lowStockItems.map(item => (
                    <TableRow key={item._id}>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary" component={Link} to="/order">
                          Reorder Stocks
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
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

function useGetLowStockItems() {
  return useQuery({
    queryKey: ["lowStockItems"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/inventory");
      const data = await response.json();

      const aggregatedData = data.reduce((acc, item) => {
        if (acc[item.itemName]) {
          acc[item.itemName].quantity += item.quantity;
        } else {
          acc[item.itemName] = { ...item };
        }
        return acc;
      }, {});

      return Object.values(aggregatedData).filter(item => item.quantity < 200 && item.quantity > 0);
    },
    refetchOnWindowFocus: false,
  });
}