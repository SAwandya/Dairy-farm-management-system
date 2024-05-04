import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import {
    Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import useMessage from "../../hooks/useMessages";

const NotificationListPop = (props) => {
  const navigate = useNavigate();

  const { opennotify, setOpennotify, refetch, handlefunction } = props;

  const closepopup = () => {
    setOpennotify(false);
  };

  const { data, isLoading } = useMessage();

  console.log(data);

  return (
    <>
      <Dialog
        component="form"
        open={opennotify}
        onClose={closepopup}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Notifications{" "}
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          {data?.map((message) => (
            <>
              <Stack spacing={2} margin={2}>
                <Alert severity="warning">
                  <Typography>Message : {message.message}</Typography>
                  <Typography>
                    Product : {message.purchase.product.name}
                  </Typography>
                  <Typography>
                    Quantity : {message.purchase.quantity}
                  </Typography>
                  <Typography>
                    Order Date : {message.purchase.orderDate.substring(0, 10)}
                  </Typography>
                </Alert>
              </Stack>
            </>
          ))}
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

export default NotificationListPop;
