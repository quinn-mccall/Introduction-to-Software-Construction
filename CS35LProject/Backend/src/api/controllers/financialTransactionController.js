const FinancialTransactionModel = require('../../models/FinancialTransactionModel.js');
const FinancialTransactionService = require('../../services/FinancialTransactionService.js')

const getAllFinancialTransactions = async (req, res) => {
    try {
        const allFinancialTransactions = await FinancialTransactionService.getAllFinancialTransactions();
        res.status(200).json(allFinancialTransactions);
    } catch (error) {
        console.error('Function controllers/getAllFinancialTransactions error:', error);
        res.status(500).send('Error when getting FinancialTransactions from the database');
    }
};

const addFinancialTransaction = async (req, res) => {
    try {
        const FinancialTransaction = new FinancialTransactionModel(
            req.body.id,
            req.body.appUserId,
            req.body.categoryId,
            req.body.amount,
            req.body.transactionDate,
            req.body.description,
            req.body.canceled
        );
        const financialTransaction = await FinancialTransactionService.addFinancialTransaction(FinancialTransaction);
        //Update to success code after inserting
        res.status(200).json(financialTransaction);
    } catch (error) {
        console.error('Function controllers/addFinancialTransaction error:', error);
        res.status(500).send('Error when adding FinancialTransaction from the database');
    }
};

const getFinancialTransactionById = async (req, res) => {
    try {
        console.log(req.id)
        const financialTransaction = await FinancialTransactionService.getFinancialTransactionById(req.params.id);
        res.status(200).json(financialTransaction);
    } catch (error) {
        console.error('Function controllers/getFinancialTransactionById error:', error);
        res.status(500).send('Error when getting financial transaction from the database');
    }
};


const updateFinancialTransaction = async (req, res) => {
    try {
        const financialTransaction = new FinancialTransactionModel(
            req.body.id,
            req.body.appUserId,
            req.body.categoryId,
            req.body.amount,
            new Date(req.body.transactionDate),
            req.body.description,
            req.body.canceled
        );
        const fixedFinancialTransaction = await FinancialTransactionService.updateFinancialTransaction(financialTransaction);
        
        res.status(200).json(fixedFinancialTransaction);
    } catch (error) {
        console.error('Function controllers/updateFinancialTransaction error:', error);
        res.status(500).send('Error when updating financial transaction from the database');
    }
};

const getTransactionsByUserId = async (req, res) => {
    try {
        const allFinancialTransactions = await FinancialTransactionService.getTransactionsByUserId(req.params.appUserId);
        res.status(200).json(allFinancialTransactions);
    } catch (error) {
        console.error('Function controllers/getTransactionsByUserId error:', error);
        res.status(500).send('Error when getting FinancialTransactions from the database');
    }
};

const deleteFinancialTransaction = async (req, res) => {
    try {
        const allFinancialTransactions = await FinancialTransactionService.deleteFinancialTransaction(req.params.id);
        res.status(200).json(allFinancialTransactions);
    } catch (error) {
        console.error('Function controllers/deleteFinancialTransactions error:', error);
        res.status(500).send('Error when deleting financial transaction from the database');
    }
    
};

const getTransWithUserIdAndCategory= async (req, res) => {
    try {
        const FinancialTransactions = await FinancialTransactionService.getTransWithUserIdAndCategory(req.params.appUserId, req.params.categoryName);
        res.status(200).json(FinancialTransactions);
    } catch (error) {
        console.error('Function controllers/getTransWithUserIdAndCategory error:', error);
        res.status(500).send('Error when getting financial transaction and category from the database');
    }
    
};

///////////////////
const getTransWithUserIdAndMonth = async (req, res) => {
    try {
        const FinancialTransactions = await FinancialTransactionService.getTransWithUserIdAndMonth(req.params.appUserId, req.params.type, req.params.month, req.params.year);
        res.status(200).json(FinancialTransactions);
    } catch (error) {
        console.error('Function controllers/getTransWithUserIdAndMonth error:', error);
        res.status(500).send('Error when getting financial transaction from the database');
    }
    
};

const getAllTransactionsOfMonth = async (req, res) => {
    try {
        const FinancialTransactions = await FinancialTransactionService.getAllTransactionsOfMonth(req.params.appUserId, req.params.month, req.params.year);
        res.status(200).json(FinancialTransactions);
    } catch (error) {
        console.error('Function controllers/getAllTransactionsOfMonth error:', error);
        res.status(500).send('Error when getting financial transaction from the database');
    }
    
};

const getSumOfTransactionsByTypeAndMonth = async (req, res) => {
    try {
        const sum = await FinancialTransactionService.getSumOfTransactionsByTypeAndMonth(req.params.appUserId, req.params.type, req.params.month, req.params.year);
        res.status(200).json({ total : sum });
    } catch (error) {
        console.error('Function controllers/getSumOfTransactionsByTypeAndMonth error:', error);
        res.status(500).send('Error when getting financial transaction from the database');
    }
};

module.exports = {
    getAllFinancialTransactions,
    addFinancialTransaction,
    getFinancialTransactionById,
    updateFinancialTransaction,
    deleteFinancialTransaction,
    getTransactionsByUserId,
    getTransWithUserIdAndMonth,
    getAllTransactionsOfMonth,
    getSumOfTransactionsByTypeAndMonth,
    getTransWithUserIdAndCategory
}