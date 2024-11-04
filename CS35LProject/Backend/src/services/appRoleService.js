const AppRole = require('../models/appRoleModel.js');
//Manipulacion de base
const { getConnection, sql } = require('../config/database.js');

const addRole = async (appRole) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('name', sql.VarChar(100), appRole.name)
            .input('description', sql.VarChar(500), appRole.description)
            .input('enabled', sql.Bit , appRole.enabled)
            .query(`INSERT INTO AppRole (name, description, enabled) VALUES (@name, @description, @enabled);  SELECT SCOPE_IDENTITY() as id`);
        return new AppRole(
            result.recordset[0].id,
            appRole.name,
            appRole.description,
            appRole.enabled
        );
    } catch (error) {
        console.log('Function services/appRoleService/addRole error:', error);
        throw error;
    }
};

const getAllRoles = async () => {
    try {
        //Pool to be an instance of connection *
        const pool = await getConnection(); //Await because the getConnection function is async
        const result = await pool.request().query('SELECT * FROM AppRole');
        return result.recordset.map(record => new AppRole(
            record.id,
            record.name,
            record.description,
            record.enabled
        ));
    } catch (error) {
        console.log('Function services/getAllRoles error:', error);
        throw error;
    }
};


const updateRole = async (appRole) => {
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, appRole.id)
            .input('name', sql.VarChar(100), appRole.name)
            .input('description', sql.VarChar(500), appRole.description)
            .input('enabled', sql.Bit, appRole.enabled)
            .query('UPDATE AppRole SET name = @name, description = @description, enabled = @enabled WHERE id = @id');
        return "Updated correctly";
    } catch (error) {
        console.log('Function services/appRoleService/updateRole error:', error);
        throw error;
    }
};

const deleteRole = async (id) => {
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.BigInt, id)
            .query('DELETE FROM AppRole WHERE id = @id');
        return "Deleted correctly";
    } catch (error) {
        console.log('Function services/appRoleService/deleteRole error:', error);
        throw error;
    }
};


module.exports = {
    addRole,
    getAllRoles,
    deleteRole,
    updateRole
};