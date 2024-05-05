const validateOrder = (row) => {
  let errors = {};

  if (!row.orderType) {
    errors.orderType = "Order type is required";
  }

  if (!row.quantity) {
    errors.quantity = "Quantity is required";
  } else if (isNaN(row.quantity)) {
    errors.quantity = "Quantity must be a number";
  } else if (row.quantity < 0) {
    errors.quantity = "Quantity cannot be a negative number";
  }

  if (!row.advanceFee) {
    errors.advanceFee = "Advance fee is required";
  } else if (isNaN(row.advanceFee)) {
    errors.advanceFee = "Advance fee must be a number";
  } else if (row.advanceFee < 0) {
    errors.advanceFee = "Advance fee cannot be a negative number";
  }

  return errors;
};