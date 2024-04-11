import React from "react";
import CloseIcon from "@mui/icons-material/Close";
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

const MessagePop = (props) => {
  const navigate = useNavigate();

  const { opennotify, setOpennotify, refetch, handlefunction } = props;

  const closepopup = () => {
    setOpennotify(false);
  };

  return (
    <>
      {/* { Dialog box } */}

      <Dialog
        // fullScreen
        component="form"
        // onSubmit={handleSubmit(onSubmit)}
        open={opennotify}
        onClose={closepopup}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Are you sure you want to delete this item?{" "}
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
          <Stack spacing={2} margin={2}>
            <Button
              onClick={() => handlefunction()}
              type="submit"
              color="primary"
              variant="contained"
            >
              Delete
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

export default MessagePop;
