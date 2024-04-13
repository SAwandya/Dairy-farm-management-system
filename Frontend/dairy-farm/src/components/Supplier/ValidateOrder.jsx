const validateOrder = (row) => {
  let errors = {};

  if (!row.orderType) {
    errors.orderType = "Order type is required";
  }

  if (!row.quantity) {
    errors.quantity = "Quantity is required";
  } else if (isNaN(row.quantity)) {
    errors.quantity = "Quantity must be a number";
  }

  if (!row.advanceFee) {
    errors.advanceFee = "Advance fee is required";
  } else if (isNaN(row.advanceFee)) {
    errors.advanceFee = "Advance fee must be a number";
  }

//   if (!row.deliveryDate) {
//     errors.deliveryDate = "Delivery date is required";
//   }

  return errors;
};