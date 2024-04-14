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

      <Dialog
        component="form"
        open={opennotify}
        onClose={closepopup}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Are you sure you want to delete?{" "}
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
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
         
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MessagePop;
