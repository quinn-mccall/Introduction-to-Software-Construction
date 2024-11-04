const Category = require('../models/categoryModel.js');

//Manipulacion de base
const { getConnection, sql } = require('../config/database.js');

// FUNCTIONS TO COMPLETE:

const addCategory = async (category) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('appUserId', sql.BigInt, category.appUserId)
            .input('name', sql.VarChar(100), category.name)
            .input('type', sql.VarChar(50), category.type)
            .input('description', sql.VarChar(500), category.description)
            .input('enabled', sql.Bit, category.enabled)
            .query(`INSERT INTO Category (appUserId, name, type, description, enabled) 
                    VALUES (@appUserId, @name, @type, @description, @enabled);
                    SELECT SCOPE_IDENTITY() as id;`);
        return new Category(
            result.recordset[0].id,
            category.appUserId,
            category.name,
            category.type,
            category.description,
            category.enabled
        );
    } catch (error) {
        console.log('Function services/addCategory error:', error);
        throw error;
    }
};

const getCategoriesByUserId = async (appUserId) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('appUserId', sql.BigInt, appUserId)
            .query('SELECT * FROM Category WHERE appUserId = @appUserId');
        return result.recordset.map(record => new Category(
            record.id,
            record.appUserId,
            record.name,
            record.type,
            record.description,
            record.enabled
        ));
    } catch (error) {
        console.log('Function services/getCategoriesByUserId error:', error);
        throw error;
    }
};

const getCategoryById = async (id, appUserId) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('idArg', sql.BigInt, id)
            .input('appUserIdArg', sql.BigInt, appUserId)
            .query('SELECT * FROM Category WHERE id = @idArg');
        const record = result.recordset[0];
        if (record) {
            return new Category(
                record.id,
                record.appUserId,
                record.name,
                record.type,
                record.description,
                record.enabled
            );
        }
    } catch (error) {
        console.log('Function services/getCategoryByIdAndUserId error:', error);
        throw error;
    }
};

const getCategoriesByName = async (name, appUserId) => {
    try {

        const pool = await getConnection();
        const result = await pool.request()
            .input('nameArg', sql.VarChar(100), name)
            .input('appUserIdArg', sql.BigInt, appUserId)
            .query('SELECT * FROM Category WHERE name = @nameArg AND appUserId = @appUserIdArg');

        if (result.recordset.length === 0) {
            console.log('No categories found for name.');
            return [];
        }

        return result.recordset.map(record => new Category(
            record.id,
            record.appUserId,
            record.name,
            record.type,
            record.description,
            record.enabled
        ));
    } catch (error) {
        console.log('Function services/getCategoriesByName error:', error);
        throw error;
    }
};

const getAllCategories = async () => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Category');
        return result.recordset.map(record => new Category(
            record.id,
            record.appUserId,
            record.name,
            record.type,
            record.description,
            record.enabled
        ));
    } catch (error) {
        console.log('Function services/getAllCategories error:', error);
        throw error;
    }
};

const updateCategory = async (category) => {
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.BigInt, category.id)
            .input('appUserId', sql.BigInt, category.appUserId)
            .input('name', sql.VarChar(100), category.name)
            .input('type', sql.VarChar(50), category.type)
            .input('description', sql.VarChar(500), category.description)
            .input('enabled', sql.Bit, category.enabled)
            .query(`UPDATE Category 
                    SET appUserId = @appUserId, name = @name, type = @type, 
                        description = @description, enabled = @enabled 
                    WHERE id = @id`);
        return "Updated correctly";
    } catch (error) {
        console.log('Function services/updateCategory error:', error);
        throw error;
    }
};

const deleteCategoryById = async (id) => {
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.BigInt, id)
            .query('DELETE FROM Category WHERE id = @id');
        return "Deleted correctly";
    } catch (error) {
        console.log('Function services/deleteCategoryById error:', error);
        throw error;
    }
};

module.exports = { 
    addCategory,
    getCategoriesByUserId,
    getCategoryById,
    getAllCategories,
    updateCategory,
    deleteCategoryById,
    getCategoriesByName
};
