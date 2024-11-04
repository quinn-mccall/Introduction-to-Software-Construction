const Permission = require('../models/permissionModel.js');
// Manipulacion de base
const { getConnection, sql } = require('../config/database.js');

const addPermission = async (permission) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('name', sql.VarChar(100), permission.name)
            .input('description', sql.VarChar(500), permission.description)
            .input('enabled', sql.Bit, permission.enabled)
            .query(`INSERT INTO Permission (name, description, enabled) VALUES (@name, @description, @enabled); SELECT SCOPE_IDENTITY() as id`);
        return new Permission(
            result.recordset[0].id,
            permission.name,
            permission.description,
            permission.enabled
        );
    } catch (error) {
        console.log('Function services/permissionService/addPermission error:', error);
        throw error;
    }
};

const getAllPermissions = async () => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Permission');
        return result.recordset.map(record => new Permission(
            record.id,
            record.name,
            record.description,
            record.enabled
        ));
    } catch (error) {
        console.log('Function services/permissionService/getAllPermissions error:', error);
        throw error;
    }
};

const updatePermission = async (permission) => {
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.BigInt, permission.id)
            .input('name', sql.VarChar(100), permission.name)
            .input('description', sql.VarChar(500), permission.description)
            .input('enabled', sql.Bit, permission.enabled)
            .query('UPDATE Permission SET name = @name, description = @description, enabled = @enabled WHERE id = @id');
        return "Updated correctly";
    } catch (error) {
        console.log('Function services/permissionService/updatePermission error:', error);
        throw error;
    }
};

const deletePermission = async (id) => {
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.BigInt, id)
            .query('DELETE FROM Permission WHERE id = @id');
        return "Deleted correctly";
    } catch (error) {
        console.log('Function services/permissionService/deletePermission error:', error);
        throw error;
    }
};

module.exports = {
    addPermission,
    getAllPermissions,
    updatePermission,
    deletePermission
};
