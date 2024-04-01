import React from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import messageService from "../../services/Sales/messageService";
import purchaseService from "../../services/Sales/purchaseService";

const OrderUpdatePopup = (props) => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 510px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  const closepopup = () => {
    openchange(false);
  };

  const onSubmit = (data) => {
    purchaseService
      .Update(purchaseId, data)
      .then((res) => {
        console.log(res.data);
        openchange(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const { open, openchange, purchaseId, refetch, purchase } = props;

  console.log(purchase?.deliveryDetails.firstName);

  // const { firstName } = purchase.deliveryDetails;

  return (
    <>
      {/* { Dialog box } */}

      <Dialog
        // fullScreen
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        open={open}
        onClose={closepopup}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>
          Edit Order Details{" "}
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
          <Stack spacing={2} margin={2}>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ marginRight: "10px" }}>
                <TextField
                  {...register("firstName", { required: true })}
                  id="firstName"
                  type="text"
                  label="First name"
                  sx={{ marginBottom: "20px" }}
                  fullWidth
                  defaultValue={purchase?.deliveryDetails.firstName}
                  error={errors?.firstName ? true : false}
                  helperText={
                    errors?.firstName && (
                      <Alert severity="error">
                        The First name filed is canot be empty{" "}
                      </Alert>
                    )
                  }
                />

                <TextField
                  {...register("lastName", { required: true })}
                  id="lastName"
                  type="text"
                  label="Last name"
                  sx={{ marginBottom: "20px" }}
                  fullWidth
                  defaultValue={purchase?.deliveryDetails.lastName}
                  error={errors?.lastName ? true : false}
                  helperText={
                    errors?.lastName && (
                      <Alert severity="error">
                        The First Last name filed is canot be empty{" "}
                      </Alert>
                    )
                  }
                />

                <TextField
                  {...register("address1", { required: true })}
                  id="address1"
                  label="Address 1"
                  type="text"
                  sx={{ marginBottom: "20px" }}
                  fullWidth
                  defaultValue={purchase?.deliveryDetails.address1}
                  error={errors?.address1 ? true : false}
                  helperText={
                    errors?.address1 && (
                      <Alert severity="error">
                        The Address 1 filed is canot be empty{" "}
                      </Alert>
                    )
                  }
                />

                <TextField
                  {...register("address2", { required: true })}
                  id="address2"
                  label="Address"
                  type="text"
                  sx={{ marginBottom: "20px" }}
                  fullWidth
                  defaultValue={purchase?.deliveryDetails.address2}
                  error={errors?.address2 ? true : false}
                  helperText={
                    errors?.address2 && (
                      <Alert severity="error">
                        The address 2 filed is canot be empty{" "}
                      </Alert>
                    )
                  }
                />
              </Box>

              <Box>
                <TextField
                  {...register("city", { required: true })}
                  id="city"
                  type="text"
                  label="City"
                  sx={{ marginBottom: "20px" }}
                  fullWidth
                  defaultValue={purchase?.deliveryDetails.city}
                  error={errors?.city ? true : false}
                  helperText={
                    errors?.city && (
                      <Alert severity="error">
                        The city filed is canot be empty{" "}
                      </Alert>
                    )
                  }
                />

                <TextField
                  {...register("state", { required: true })}
                  id="state"
                  fullWidth
                  label="State"
                  type="text"
                  sx={{ marginBottom: "20px" }}
                  defaultValue={purchase?.deliveryDetails.state}
                  error={errors?.state ? true : false}
                  helperText={
                    errors?.state && (
                      <Alert severity="error">
                        The state filed is canot be empty{" "}
                      </Alert>
                    )
                  }
                />

                <TextField
                  {...register("cardNumber", { required: true })}
                  id="cardNumber"
                  label="Card number"
                  type="number"
                  fullWidth
                  sx={{ marginBottom: "20px" }}
                  error={errors?.cardNumber ? true : false}
                  helperText={
                    errors?.cardNumber && (
                      <Alert severity="error">
                        The card number filed is canot be empty{" "}
                      </Alert>
                    )
                  }
                />

                <TextField
                  {...register("cardName", { required: true })}
                  id="cardName"
                  fullWidth
                  type="text"
                  label="Card name"
                  sx={{ marginBottom: "20px" }}
                  defaultValue={purchase?.paymentDetails.cardName}
                  error={errors?.cardName ? true : false}
                  helperText={
                    errors?.cardName && (
                      <Alert severity="error">
                        The card name filed is canot be empty{" "}
                      </Alert>
                    )
                  }
                />

                <TextField
                  {...register("expDate", { required: true })}
                  id="expDate"
                  label="Expire date"
                  type="date"
                  fullWidth
                  sx={{ marginBottom: "20px" }}
                  InputLabelProps={{ shrink: true }}
                  error={errors?.expDate ? true : false}
                  helperText={
                    errors?.expDate && (
                      <Alert severity="error">
                        The expire date is canot be empty{" "}
                      </Alert>
                    )
                  }
                />
              </Box>
            </Box>

            <Button
              type="submit"
              sx={{
                background: "rgba(155, 207, 83, 0.8)",
                borderRadius: "10px",
                margin: "10px",
                color: "black",
              }}
              variant="contained"
            >
              Update
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          {/* <Button color="success" variant="contained">Yes</Button>
                    <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderUpdatePopup;
