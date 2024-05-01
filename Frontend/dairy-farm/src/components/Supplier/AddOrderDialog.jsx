import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { FormHelperText } from "@mui/material";

const AddOrderDialog = ({
  open,
  handleClose,
  handleAdd,
  newRow,
  setNewRow,
  suppliers,
  itemTypes,
  validationErrors,
}) => {
  const [quantityError, setQuantityError] = useState("");
  const [advanceFeeError, setAdvanceFeeError] = useState("");

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value < 0) {
      setQuantityError("Quantity cannot be negative");
    } else {
      setQuantityError("");
      setNewRow({ ...newRow, quantity: value });
    }
  };

  const handleAdvanceFeeChange = (e) => {
    const value = e.target.value;
    if (value < 0) {
      setAdvanceFeeError("Advance Fee cannot be negative");
    } else {
      setAdvanceFeeError("");
      setNewRow({ ...newRow, advanceFee: value });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
          error={!!quantityError || !!validationErrors?.quantity}
          helperText={quantityError || validationErrors?.quantity}
          margin="dense"
          id="quantity"
          label="Quantity"
          type="number"
          fullWidth
          value={newRow.quantity}
          onChange={handleQuantityChange}
        />
        <TextField
          error={!!advanceFeeError || !!validationErrors?.advanceFee}
          helperText={advanceFeeError || validationErrors?.advanceFee}
          margin="dense"
          id="advanceFee"
          label="Advance Fee"
          type="number"
          fullWidth
          value={newRow.advanceFee}
          onChange={handleAdvanceFeeChange}
        />
        <TextField
          error={!!validationErrors?.deliveryDate}
          helperText={validationErrors?.deliveryDate}
          margin="dense"
          id="deliveryDate"
          label="Delivery Date"
          type="date"
          fullWidth
          value={newRow.deliveryDate}
          onChange={(e) => setNewRow({ ...newRow, deliveryDate: e.target.value })}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary" disabled={quantityError || advanceFeeError}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrderDialog;