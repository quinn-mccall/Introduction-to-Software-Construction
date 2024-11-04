import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionItem from './transactionItem';
import ConfirmationDialog from './confirmationDialog';
import EditTransactionDialog from './editTransactionDialog';
import Search from '../search';

import '../historyPage.css'; // Import the CSS file

const backendAPI = "http://localhost:3001/";

const TransactionList = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [currentTransactionId, setCurrentTransactionId] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    appUserId: '',
    categoryId: '',
    amount: '',
    transactionDate: '',
    description: '',
    canceled: false,
  });

  useEffect(() => {
    if (userId) {
      const fetchTransactions = async () => {
        try {
          const response = await axios.get(`${backendAPI}financialtransaction-user/${userId}`, { withCredentials: true });
          setTransactions(response.data);

          // Fetch categories for all transactions
          const categoryResponses = await Promise.all(response.data.map(transaction =>
            axios.get(`${backendAPI}category/${transaction.categoryId}`, { withCredentials: true })
          ));
          
          const categoryData = {};
          categoryResponses.forEach((categoryResponse, index) => {
            categoryData[response.data[index].categoryId] = categoryResponse.data;
          });
          setCategories(categoryData);

        } catch (error) {
          console.error('Error fetching transactions or categories:', error);
        }
      };

      fetchTransactions();
    }
  }, [userId]);

  const handleOpenDialog = (id) => {
    setCurrentTransactionId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentTransactionId(null);
  };

  const handleConfirmAction = async (action) => {
    if (action === 'delete') {
      try {
        const resp = await axios.delete(`${backendAPI}financialtransaction/${currentTransactionId}`);
        if (resp.data === "Deleted correctly") {
          setTransactions(transactions.filter(transaction => transaction.id !== currentTransactionId));
        }
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    } else if (action === 'cancel') {
      try {
        const transactionToUpdate = transactions.find(transaction => transaction.id === currentTransactionId);
        const updatedTransaction = { ...transactionToUpdate, canceled: true };

        const resp = await axios.put(`${backendAPI}financialtransaction`, updatedTransaction);
        if (resp.status === 200) {
          setTransactions(transactions.map(transaction =>
            transaction.id === currentTransactionId ? { ...transaction, canceled: true } : transaction
          ));
        }
      } catch (error) {
        console.error('Error canceling transaction:', error);
      }
    }

    handleCloseDialog();
  };

  const handleOpenEditDialog = (transaction) => {
    setCurrentTransaction(transaction);
    setFormData({ ...transaction });
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setCurrentTransaction(null);
  };

  const formatDateToSQL = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const hours = ('0' + d.getHours()).slice(-2);
    const minutes = ('0' + d.getMinutes()).slice(-2);
    const seconds = ('0' + d.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  
  const handleSaveTransaction = async (formData) => {
    try {
      console.log('Form Data before update:', formData);
      const response = await axios.put(`${backendAPI}financialtransaction`, formData);
      const updatedTransaction = response.data;
  
      // Fetch updated category details
      console.log('Updated Transaction:', updatedTransaction);
      const categoryResponse = await axios.get(`${backendAPI}category/${updatedTransaction.categoryId}`, { withCredentials: true });
      const updatedCategory = categoryResponse.data;
  
      console.log('Updated Category:', updatedCategory);
  
      setCategories({
        ...categories,
        [updatedTransaction.categoryId]: updatedCategory
      });
  
      setTransactions(transactions.map(transaction =>
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      ));
      handleCloseEditDialog();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };
  
  
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="transaction-list">
      <Search userId={userId} setTransactions={setTransactions} /> {/* ADD SEARCH COMPONENT AND PASS setTransactions PROP */}
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              category={categories[transaction.categoryId]}
              onDelete={handleOpenDialog}
              onEdit={handleOpenEditDialog}
            />
          ))}
        </ul>
      ) : (
        <p id="no-trans">No transactions found.</p>
      )}
      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmAction}
      />
      <EditTransactionDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        categories={Object.values(categories)}
        formData={formData}
        onChange={handleChange}
        onSave={handleSaveTransaction}
      />
    </div>
  );
};

export default TransactionList;