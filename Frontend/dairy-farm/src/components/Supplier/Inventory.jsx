import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [supplier, setSupplier] = useState('');

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const response = await fetch('http://localhost:3000/api/inventory');
    const data = await response.json();
    setInventory(data);
  };

  const addInventory = async (e) => {
    e.preventDefault();
    const newInventory = { item, quantity, supplier };
    await fetch('http://localhost:3000/api/inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newInventory),
    });
    fetchInventory();
  };

  return (
    <div>
      <form onSubmit={addInventory}>
        <TextField value={item} onChange={e => setItem(e.target.value)} label="Item" required />
        <TextField value={quantity} onChange={e => setQuantity(e.target.value)} label="Quantity" required />
        <TextField value={supplier} onChange={e => setSupplier(e.target.value)} label="Supplier" required />
        <Button type="submit" variant="contained">Add</Button>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Supplier</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map(item => (
              <TableRow key={item._id}>
                <TableCell>{item.item}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.supplier}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Inventory;