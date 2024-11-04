const FinancialTransaction = require('../models/FinancialTransactionModel.js');
const { getConnection, sql } = require('../config/database.js');

const getAllFinancialTransactions = async () => {
    try {
        const pool = await getConnection(); //Await because the getConnection function is async
        const result = await pool.request().query('SELECT * FROM FinancialTransaction');
        return result.recordset.map(record => new FinancialTransaction(
            record.id,
            record.appUserId,
            record.categoryId,
            record.amount,
            record.transactionDate,
            record.description,
            record.canceled,
        ));
    } catch (error) {
        console.log('Function services/getAllFinancialTransactions error:', error);
        throw error;
    }
};

const getTransactionsByUserId = async (appUserId) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('appUserId', sql.BigInt, appUserId)
            .query('SELECT * FROM FinancialTransaction WHERE appUserId = @appUserId');
        return result.recordset.map(record => new FinancialTransaction(
            record.id,
            record.appUserId,
            record.categoryId,
            record.amount,
            record.transactionDate,
            record.description,
            record.canceled
        ));
    } catch (error) {
        console.log('Function services/getTransactionsByUserId error:', error);
        throw error;
    }
};

const getFinancialTransactionById = async (id) => {
    try {
        const pool = await getConnection();
        const result = await pool.request() //The following lines are a dynamic query
            .input('idArg', sql.BigInt, id) //Creates SQL argument 'idArg' with the 'id' passed to the function
            .query('SELECT * FROM FinancialTransaction WHERE id = @idArg');
        const record = result.recordset[0];
        if (record) {
            return new FinancialTransaction(
                record.id,
                record.appUserId,
                record.categoryId,
                record.amount,
                record.transactionDate,
                record.description,
                record.canceled
            );
        }
        return null;
    } catch (error) {
        console.log('Function services/getFinancialTransactionById error:', error);
        throw error;
    }
};

const addFinancialTransaction = async (financialTransaction) => {
    try {
        //console.log({financialTransaction});
        const pool = await getConnection();
        const result = await pool.request()
            .input('appUserId', sql.BigInt, financialTransaction.appUserId)
            .input('categoryId', sql.BigInt, financialTransaction.categoryId)
            .input('amount', sql.Money, financialTransaction.amount)
            .input('description', sql.VarChar, financialTransaction.description)
            .input('canceled', sql.Bit, financialTransaction.canceled)

            //Query to insert into database
            .query(`INSERT INTO FinancialTransaction (appUserId, categoryId, amount,  description, canceled) VALUES (@appUserId, @categoryId, @amount, @description, @canceled);
            SELECT SCOPE_IDENTITY() as id;`); //Scope identity returns id of the new user added
        return new FinancialTransaction(
            result.recordset[0].id,
            financialTransaction.appUserId,
            financialTransaction.categoryId,
            financialTransaction.amount,
            new Date(),
            financialTransaction.description,
            financialTransaction.canceled,
        );

    } catch (error) {
        console.log('Function services/addFinancialTranscation error:', error);
        throw error;
    }
};
const getTransWithUserIdAndCategory = async (appUserId, categoryName) => {
    try {
        const pool = await getConnection();

        // Log the parameters for debugging
        //console.log('appUserId:', appUserId);
        //console.log('categoryName:', categoryName);

        const result = await pool.request()
            .input('appUserId', sql.BigInt, appUserId)
            .input('categoryName', sql.VarChar(100), categoryName)
            .query(`
                SELECT ft.*
                FROM FinancialTransaction ft
                JOIN Category c ON ft.categoryId = c.id
                WHERE ft.appUserId = @appUserId
                  AND c.appUserId = @appUserId
                  AND c.name = @categoryName;
            `); // excluding canceled transactions

        // Log the query result for debugging
        //console.log('Query result:', result.recordset);

        if (result.recordset.length === 0) {
            console.log('No transactions found for entered category.');
            return [];
        }

        return result.recordset.map(record => new FinancialTransaction(
            record.id,
            record.appUserId,
            record.categoryId,
            record.amount,
            record.transactionDate,
            record.description,
            record.canceled
        ));
    } catch (error) {
        console.log('Function services/getTransWithUserIdAndCategory error:', error);
        throw error;
    }
};
const updateFinancialTransaction = async (FinancialTransaction) => {
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.BigInt, FinancialTransaction.id)
            .input('categoryId', sql.BigInt, FinancialTransaction.categoryId)
            .input('amount', sql.Money, FinancialTransaction.amount)
            .input('description', sql.VarChar, FinancialTransaction.description)
            .input('date', sql.DateTime, FinancialTransaction.transactionDate)
            .input('canceled', sql.Bit, FinancialTransaction.canceled)
            .query('UPDATE FinancialTransaction SET categoryId = @categoryId, amount = @amount, description = @description, canceled = @canceled, transactionDate = @date WHERE id = @id');
        return getFinancialTransactionById(FinancialTransaction.id);
    } catch (error) {
        console.log('Function services/updateFinancialTransaction error:', error);
        throw error;
    }
};

const deleteFinancialTransaction = async (id) => {
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.BigInt, id)
            .query('DELETE FROM FinancialTransaction WHERE id = @id');
        return "Deleted correctly";
    } catch (error) {
        console.log('Function services/deleteFinancialTransaction error:', error);
        throw error;
    }
};

////////////////
//Function that returns expenses with user ID and month
const getTransWithUserIdAndMonth = async (appUserId, type, month, year) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('appUserId', sql.BigInt, appUserId)
            .input('month', sql.TinyInt, month)
            .input('year', sql.SmallInt, year)
            .input('type', sql.VarChar(1), type)
            .query(`SELECT ft.*
            FROM FinancialTransaction ft
            JOIN Category c ON ft.categoryId = c.id
            WHERE ft.appUserId = @appUserId
              AND c.appUserId = @appUserId
              AND c.type = @type
              AND MONTH(ft.transactionDate) = @month
              AND YEAR(ft.transactionDate) = @year
              AND ft.canceled = 0;`); //excluding canceled transactions
        return result.recordset.map(record => new FinancialTransaction(
            record.id,
            record.appUserId,
            record.categoryId,
            record.amount,
            record.transactionDate,
            record.description,
            record.canceled
        ));
    } catch (error) {
        console.log('Function services/getTransactionsByUserId error:', error);
        throw error;
    }
};

const getAllTransactionsOfMonth = async (appUserId, month, year) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('appUserId', sql.BigInt, appUserId)
            .input('month', sql.TinyInt, month)
            .input('year', sql.SmallInt, year)
            .query(`SELECT *
            FROM FinancialTransaction
            WHERE appUserId = @appUserId
              AND MONTH(transactionDate) = @month
              AND YEAR(transactionDate) = @year
              AND canceled = 0;`);
        return result.recordset.map(record => new FinancialTransaction(
            record.id,
            record.appUserId,
            record.categoryId,
            record.amount,
            record.transactionDate,
            record.description,
            record.canceled
        ));
    } catch (error) {
        console.log('Function services/getAllTransactionsOfMonth error:', error);
        throw error;
    }
};

const getSumOfTransactionsByTypeAndMonth = async (appUserId, type, month, year) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('appUserId', sql.BigInt, appUserId)
            .input('month', sql.TinyInt, month)
            .input('year', sql.SmallInt, year)
            .input('type', sql.VarChar(1), type)
            .query(`SELECT SUM(ft.amount) AS total
            FROM FinancialTransaction ft
            JOIN Category c ON ft.categoryId = c.id
            WHERE ft.appUserId = @appUserId
              AND c.appUserId = @appUserId
              AND c.type = @type
              AND MONTH(ft.transactionDate) = @month
              AND YEAR(ft.transactionDate) = @year
              AND ft.canceled = 0; `); //excluding the canceled transactions
        //console.log(result);
        return result.recordset[0].total;
    } catch (error) {
        console.log('Function services/getAllTransactionsOfMonth error:', error);
        throw error;
    }
};

module.exports = {
    getAllFinancialTransactions,
    getFinancialTransactionById,
    addFinancialTransaction,
    updateFinancialTransaction,
    deleteFinancialTransaction,
    getTransactionsByUserId,
    getAllTransactionsOfMonth,
    getTransWithUserIdAndMonth,
    getSumOfTransactionsByTypeAndMonth,
    getTransWithUserIdAndCategory
};