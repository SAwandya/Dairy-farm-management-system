import React from "react";
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

const UpdateOrderDialog = ({
  open,
  handleClose,
  handleUpdate,
  currentRow,
  setCurrentRow,
  suppliers,
  itemTypes,
  validationErrors,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Update Order</DialogTitle>
      {validationErrors && (
        <div>
          {Object.entries(validationErrors).map(([key, value]) => (
            <p key={key} style={{ color: "red", paddingLeft: "25px" }}>
              {value}
            </p>
          ))}
        </div>
      )}
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id="orderType-label">Order Type</InputLabel>
          <Select
            labelId="orderType-label"
            id="orderType"
            value={currentRow?.orderType}
            onChange={(e) => {
              setCurrentRow({ ...currentRow, orderType: e.target.value });
            }}
          >
            {itemTypes.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.itemName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="supplier-label">Supplier</InputLabel>
          <Select
            labelId="supplier-label"
            id="supplier"
            value={currentRow?.supplierName}
            onChange={(e) => setCurrentRow({ ...currentRow, supplierName: e.target.value })}
          >
            {suppliers.map((supplier) => (
              <MenuItem key={supplier._id} value={supplier.name}>
                {supplier.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          error={!!validationErrors?.quantity}
          helperText={validationErrors?.quantity}
          margin="dense"
          id="quantity"
          label="Quantity"
          type="number"
          fullWidth
          value={currentRow?.quantity}
          onChange={(e) => setCurrentRow({ ...currentRow, quantity: e.target.value })}
        />
        <TextField
          error={!!validationErrors?.quantity}
          helperText={validationErrors?.quantity}
          margin="dense"
          id="advanceFee"
          label="Advance Fee"
          type="number"
          fullWidth
          value={currentRow?.advanceFee}
          onChange={(e) => setCurrentRow({ ...currentRow, advanceFee: e.target.value })}
        />
        <TextField
          margin="dense"
          id="deliveryDate"
          label="Delivery Date"
          type="date"
          fullWidth
          value={currentRow?.deliveryDate}
          onChange={(e) => setCurrentRow({ ...currentRow, deliveryDate: e.target.value })}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => {
          const { __v, ...updateData } = currentRow;
          handleUpdate(updateData);
        }} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateOrderDialog;