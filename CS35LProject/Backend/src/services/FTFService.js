const FTF = require('../models/FTFModel.js');
const { getConnection, sql } = require('../config/database.js');

const getAllFTFs = async () => {
    try {
       //Pool to be an instance of connection *
        const pool = await getConnection(); //Await because the getConnection function is async
        const result = await pool.request().query('SELECT * FROM FinancialTransactionFixed');
        return result.recordset.map(record => new FTF(
            record.id,
            record.appUserId,
            record.categoryId,
            record.amount,
            record.registrationDate,
            record.frequency,
            record.dayOfMonth,
            record.description,
            record.enabled,
            record.fk_FinancialTransactionFixed_appUserId,
            record.fk_FinancialTransactionFixed_categoryId
        ));
    } catch (error) {
        console.log('Function services/getFTFs error:', error);
        throw error;
    }
};

const getFTFById = async (id) => {
    try {
        const pool = await getConnection();
        const result = await pool.request() //The following lines are a dynamic query
            .input('idArg', sql.BigInt, id) //Creates SQL argument 'idArg' with the 'id' passed to the function
            .query('SELECT * FROM FinancialTransactionFixed WHERE id = @idArg');
        const record = result.recordset[0];
        if (record) {
            return new FTF(
                record.id,
                record.appUserId,
                record.categoryId,
                record.amount,
                record.registrationDate,
                record.frequency,
                record.dayOfMonth,
                record.description,
                record.enabled,
                record.fk_FinancialTransactionFixed_appUserId,
                record.fk_FinancialTransactionFixed_categoryId
            );
        }
        return null;
    } catch (error) {
        console.log('Function services/getFTFById error:', error);
        throw error;
    }
};

const addFTF = async (ftf) => {
    try {
        //console.log({ftf});
        const pool = await getConnection();
        const result = await pool.request()
            .input('appUserId', sql.BigInt, ftf.appUserId)
            .input('categoryId',sql.BigInt,ftf.categoryId)
            .input('amount', sql.Money, ftf.amount)
            .input('frequency', sql.VarChar, ftf.frequency)
            .input('dayOfMonth', sql.TinyInt, ftf.dayOfMonth)
            .input('description', sql.VarChar, ftf.description)
            .input('enabled', sql.Bit, ftf.enabled)
            
            //Query to insert into database
            .query(`INSERT INTO FinancialTransactionFixed (appUserId, categoryId, amount, frequency, dayOfMonth, description, enabled) VALUES (@appUserId, @categoryId, @amount, @frequency, @dayOfMonth, @description, @enabled);
            SELECT SCOPE_IDENTITY() as id;`); //Scope identity returns id of the new user added
        return new FTF(
            result.recordset[0].id,
            ftf.appUserId,
            ftf.categoryId,
            ftf.amount,
            ftf.frequency,
            ftf.dayOfMonth,
            ftf.description,
            ftf.enabled,
            new Date(),
        );

    } catch (error) {
        console.log('Function services/addFTF error:', error);
        throw error;
    }
};

const updateFTF = async (FTF, id) => {
    try {
        const pool = await getConnection();
        await pool.request()
        .input('appUserId', sql.BigInt, FTF.appUserId)
        .input('categoryId',sql.BigInt,FTF.categoryId)
        .input('amount', sql.Money, FTF.amount)
        .input('frequency', sql.VarChar, FTF.frequency)
        .input('dayOfMonth', sql.TinyInt, FTF.dayOfMonth)
        .input('description', sql.VarChar, FTF.description)
        .input('enabled', sql.Bit, FTF.enabled)
            .query('UPDATE FinancialTransactionFixed SET appUserId = @appUserId,categoryId = @categoryID, amount = @amount, frequency = @frequency, dayOfMonth = @dayOfMonth, description = @description, enabled = @enabled');
        //return getUserById(id);
    } catch (error) {
        console.log('Function services/updateFTF error:', error);
        throw error;
    }
};

const deleteFTF = async (id) => {
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.BigInt, id)
            .query('DELETE FROM FinancialTransactionFixed WHERE id = @id');
        return "Deleted correctly";
    } catch (error) {
        console.log('Function services/deleteFTF error:', error);
        throw error;
    }
};

module.exports = {
    getAllFTFs,
    getFTFById,
    addFTF,
    updateFTF,
    deleteFTF
};