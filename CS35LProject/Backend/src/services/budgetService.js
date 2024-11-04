const Budget = require('../models/budgetModel.js');
const { getConnection, sql } = require('../config/database.js');

const getAllBudgets = async () => {
    try {
        //Pool to be an instance of connection *
        const pool = await getConnection(); //Await because the getConnection function is async
        const result = await pool.request().query('SELECT * FROM Budget');
        return result.recordset.map(record => new Budget(
            record.id,
            record.userId,
            record.amount,
            record.month,
            record.year,
            record.registrationDate
        ));
    } catch (error) {
        console.log('Function services/getAllBudgets error:', error);
        throw error;
    }
};

const getBudgetByUserId = async (appUserId) => {
    try {
        const pool = await getConnection(); //Await because the getConnection function is async
        const result = await pool.request()
            .input('appUserId', sql.BigInt, appUserId)
            .query('SELECT * FROM Budget WHERE userId = @appUserId');
        return result.recordset.map(record => new Budget(
            record.id,
            record.userId,
            record.amount,
            record.month,
            record.year,
            record.registrationDate
        ));
    } catch (error) {
        console.log('Function services/getBudgetByUserId error:', error);
        throw error;
    }
};

const getBudgetById = async (id) => {
    try {
        const pool = await getConnection();
        const result = await pool.request() //The following lines are a dynamic query
            .input('idArg', sql.BigInt, id) //Creates SQL argument 'idArg' with the 'id' passed to the function
            .query('SELECT * FROM Budget WHERE id = @idArg');
        const record = result.recordset[0];
        if (record) {
            return new Budget(
                record.id,
                record.userId,
                record.amount,
                record.month,
                record.year,
                record.registrationDate
            );
        }
        return null;
    } catch (error) {
        console.log('Function services/getBudgetById error:', error);
        throw error;
    }
};

const addBudget = async (budget) => {
    try {
        //console.log({budget});
        const pool = await getConnection();
        const result = await pool.request()
            .input('userId', sql.BigInt, budget.userId)
            .input('amount', sql.Money, budget.amount)
            .input('month', sql.TinyInt, budget.month)
            .input('year', sql.SmallInt, budget.year)

            //Query to insert into database
            .query(`INSERT INTO Budget (userId, amount, month, year) VALUES (@userId, @amount, @month, @year);
            SELECT SCOPE_IDENTITY() as id;`); //Scope identity returns id of the new user added
        return new Budget(
            result.recordset[0].id,
            budget.userId,
            budget.amount,
            budget.month,
            budget.year,
            new Date(),
        );

    } catch (error) {
        console.log('Function services/addBudget error:', error);
        throw error;
    }
};

const addOrUpdateBudget = async (budget) => {
    try {
        const pool = await getConnection();
        
        const budgetExists = await pool.request()
            .input('userId', sql.BigInt, budget.userId)
            .input('month', sql.TinyInt, budget.month)
            .input('year', sql.SmallInt, budget.year)
            .query('SELECT id FROM Budget WHERE userId = @userId AND month = @month AND year = @year');

        let result;
        if (budgetExists.recordset.length > 0) {
            // Budget exists, so update it
            const existingBudgetId = budgetExists.recordset[0].id;
            result = await pool.request()
                .input('budgetId', sql.BigInt, existingBudgetId)
                .input('amount', sql.Money, budget.amount)
                .query('UPDATE Budget SET amount = @amount WHERE id = @budgetId; SELECT @budgetId as id');
        } else {
            // No budget exists, so insert a new one
            result = await pool.request()
                .input('userId', sql.BigInt, budget.userId)
                .input('amount', sql.Money, budget.amount)
                .input('month', sql.TinyInt, budget.month)
                .input('year', sql.SmallInt, budget.year)
                .query('INSERT INTO Budget (userId, amount, month, year) VALUES (@userId, @amount, @month, @year); SELECT SCOPE_IDENTITY() as id');
        }

        return new Budget(
            result.recordset[0].id,
            budget.appUserId,
            budget.amount,
            budget.month,
            budget.year,
            new Date(),
        );

    } catch (error) {
        console.log('Function services/addOrUpdateBudget error:', error);
        throw error;
    }
};
const updateBudget = async (Budget, id) => {
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.BigInt, id)
            .input('userId', sql.BigInt, Budget.userId)
            .input('amount', sql.Money, Budget.amount)
            .input('month', sql.TinyInt, Budget.month)
            .input('year', sql.SmallInt, Budget.year)
            .query('UPDATE Budget SET userId = @userId, amount = @amount, month = @month, year = @year WHERE id=@id');
        //return getUserById(id);
    } catch (error) {
        console.log('Function services/updateBudget error:', error);
        throw error;
    }
};

const deleteBudget = async (id) => {
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.BigInt, id)
            .query('DELETE FROM Budget WHERE id = @id');
        return "Deleted correctly";
    } catch (error) {
        console.log('Function services/deleteBudget error:', error);
        throw error;
    }
};

//////
const getBudgetByUserIdAndMonth = async (appUserId, month, year) => {
    try {
        const pool = await getConnection();
        const result = await pool.request() 
            .input('appUserId', sql.BigInt, appUserId) 
            .input('month', sql.TinyInt, month) 
            .input('year', sql.SmallInt, year) 
            .query('SELECT * FROM Budget WHERE userId = @appUserId AND month = @month AND year = @year');
        const record = result.recordset[0];
        if (record) {
            return new Budget(
                record.id,
                record.userId,
                record.amount,
                record.month,
                record.year,
                record.registrationDate
            );
        }
        return null;
    } catch (error) {
        console.log('Function services/getBudgetByUserIdAndMonth error:', error);
        throw error;
    }
};

module.exports = {
    getAllBudgets,
    getBudgetById,
    addBudget,
    updateBudget,
    deleteBudget,
    getBudgetByUserId,
    getBudgetByUserIdAndMonth,
    addOrUpdateBudget
};