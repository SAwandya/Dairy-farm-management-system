import React from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import { Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import messageService from "../../services/Sales/messageService";
import purchaseService from "../../services/Sales/purchaseService";

const Popup = (props) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { open, openchange, purchaseId, refetch } = props;

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
    const newdata = { purchaseId: purchaseId, ...data };

    messageService
      .send(newdata)
      .then((res) => {
        console.log(res.data);

        purchaseService
          .Delete(purchaseId)
          .then((res) => {
            console.log(res.data);
            refetch();
          })
          .catch((err) => {
            console.log(err.message);
          });

        openchange(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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
        maxWidth="sm"
      >
        <DialogTitle>
          Send message for the customer{" "}
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
          <Stack spacing={2} margin={2}>
            <Textarea
              id="message"
              {...register("message", { required: true })}
              aria-label="minimum height"
              minRows={3}
              placeholder="Enter your message"
            />

            {errors?.message && (
              <Alert severity="warning">
                The message filed is canot be empty{" "}
              </Alert>
            )}

            <Button type="submit" color="primary" variant="contained">
              Send
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

export default Popup;
