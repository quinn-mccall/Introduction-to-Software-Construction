import React from 'react';
import editIcon from './edit.svg';
import deleteIcon from './delete.svg';

const TransactionItem = ({ transaction, category, onDelete, onEdit }) => {
  if (!transaction) return null;
  
  const type = category ? (category.type === "I" ? "Income" : "Expense") : '';
  const categoryName = category ? category.name : '';

  // Parse the date and avoid time zone issues
  const date = new Date(transaction.transactionDate);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  // Manually format the date to 'Month Day, Year'
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const formattedDateMDY = `${monthNames[month]} ${day}, ${year}`;

  return (
    <li className={`transaction-item ${type === 'Income' ? 'income' : 'expense'}`}>
      <p><strong>Type:</strong> {type}</p>
      <p><strong>Date:</strong> {formattedDateMDY}</p>
      <p><strong>Category:</strong> {categoryName}</p>
      <p><strong>Amount:</strong> ${transaction.amount}</p>
      <p><strong>Description:</strong> {transaction.description}</p>
      <p><strong>Canceled:</strong> {transaction.canceled ? 'Yes' : 'No'}</p>
      <div className="buttons">
        <button className="edit" onClick={() => onEdit(transaction)}><img src={editIcon} alt="Edit" /></button>
        <button className="delete" onClick={() => onDelete(transaction.id)}><img src={deleteIcon} alt="Delete" /></button>
      </div>
    </li>
  );
};

export default TransactionItem;
