import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import '../historyPage.css'; 

const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className='dialog-title'>Confirm Action</DialogTitle>
      <DialogContent className="dialog-content">
        <DialogContentText>
          Do you want to permanently delete this transaction or mark it as canceled?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onConfirm('delete')} type="button" className="btn btn-light">
          Delete
        </Button>
        <Button onClick={() => onConfirm('cancel')} type="button" className="btn btn-light">
          Cancel
        </Button>
        <Button onClick={onClose} type="button" className="btn btn-light" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
