const express = require('express');
const router =  express.Router();
const FinancialTransactionController = require('../controllers/financialTransactionController.js');

router.post('/financialtransaction', FinancialTransactionController.addFinancialTransaction); 
router.get('/financialtransaction', FinancialTransactionController.getAllFinancialTransactions);
router.get('/financialtransaction-user/:appUserId', FinancialTransactionController.getTransactionsByUserId);  
router.put('/financialtransaction', FinancialTransactionController.updateFinancialTransaction);
router.get('/financialtransaction/:appUserId/category/:categoryName', FinancialTransactionController.getTransWithUserIdAndCategory);  
//Gets all the financial trasaction of one user
//It doesn't cancelled transactions
router.delete('/financialtransaction/:id', FinancialTransactionController.deleteFinancialTransaction);

//This returns the all income or expenses of the month of that user. For expenses send 'E' for type, else 'I'
//It excludes cancelled transactions
router.get('/transactionsbytype-month/:appUserId/:type/:month/:year', FinancialTransactionController.getTransWithUserIdAndMonth);  

//All transactions income and expenses for the given month
//It excludes cancelled transactions
router.get('/transactions-month/:appUserId/:month/:year', FinancialTransactionController.getAllTransactionsOfMonth);  

//This returns a JSON like { "total": # } with the sum of expenses or income of the given user and month 
//It excludes cancelled transactions
router.get('/totalsum-month/:appUserId/:type/:month/:year', FinancialTransactionController.getSumOfTransactionsByTypeAndMonth);  


module.exports = router;