import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

interface DeleteDialogProps {
  open: boolean;
  onAccept: () => void;
  onCancel: () => void;
}

const DeleteDialog = ({ open, onAccept, onCancel }: DeleteDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Confirm delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this item?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary" autoFocus>
          Cancel
        </Button>
        <Button onClick={onAccept} color="primary">
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
