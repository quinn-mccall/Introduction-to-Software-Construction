import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import '../historyPage.css'; 

const EditTransactionDialog = ({ open, onClose, categories, formData, onChange, onSave }) => {

  // Ensure date is formatted as YYYY-MM-DD for the date input
  const formattedDate = formData.transactionDate ? new Date(formData.transactionDate).toISOString().split('T')[0] : '';

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle className="dialog-title">Edit Transaction</DialogTitle>
      <DialogContent className="dialog-content">
        <TextField
          select
          margin="dense"
          name="categoryId"
          label="Category"
          fullWidth
          value={formData.categoryId}
          onChange={onChange}
          variant="outlined"
          className="dialog-input"
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {(category.type === "I") ? "Income" : "Expense"} - {category.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          name="amount"
          label="Amount"
          type="number"
          fullWidth
          value={formData.amount}
          onChange={onChange}
          variant="outlined"
          className="dialog-input"
        />
        <TextField
          margin="dense"
          name="transactionDate"
          label="Transaction Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={formattedDate}
          onChange={onChange}
          variant="outlined"
          className="dialog-input"
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          value={formData.description}
          onChange={onChange}
          variant="outlined"
          className="dialog-input"
        />
        <TextField
          select
          margin="dense"
          name="canceled"
          label="Canceled"
          fullWidth
          value={formData.canceled}
          onChange={onChange}
          variant="outlined"
          className="dialog-input"
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={onClose} type="button" className="btn btn-light">
          Cancel
        </Button>
        <Button onClick={() => onSave(formData)} type="button" className="btn btn-light">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTransactionDialog;
