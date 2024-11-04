const AppUserAppRole = require('../models/appUserAppRoleModel.js');
// Manipulacion de base
const { getConnection, sql } = require('../config/database.js');

const addAppUserAppRole = async (appUserAppRole) => {
    try {
        const pool = await getConnection();
        await pool.request()
            .input('appUserId', sql.BigInt, appUserAppRole.appUserId)
            .input('appRoleId', sql.Int, appUserAppRole.appRoleId)
            .query('INSERT INTO AppUserAppRole (appUserId, appRoleId) VALUES (@appUserId, @appRoleId)');
        return appUserAppRole;
    } catch (err) {
        console.log('Function services/appUserAppRoleService/addAppUserAppRole error:', err);
        throw err;
    }
};

const getAllAppUserAppRoles = async () => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM AppUserAppRole');
        return result.recordset.map(record => new AppUserAppRole(
            record.appUserId,
            record.appRoleId
        ));
    } catch (error) {
        console.log('Function services/appUserAppRoleService/getAllAppUserAppRoles error:', error);
        throw error;
    }
};

const getUserRoles = async (appUserId) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.BigInt, appUserId)
            .query('SELECT * FROM AppUserAppRole where appUserId=@id');
        return result.recordset.map(record => new AppUserAppRole(
            record.appUserId,
            record.appRoleId
        ));
    } catch (error) {
        console.log('Function services/appUserAppRoleService/getUserRoles error:', error);
        throw error;
    }
};


const deleteAppUserAppRole = async (appUserId, appRoleId) => {
    try {
        const pool = await getConnection();
        await pool.request()
            .input('appUserId', sql.BigInt, appUserId)
            .input('appRoleId', sql.Int, appRoleId)
            .query('DELETE FROM AppUserAppRole WHERE appUserId = @appUserId AND appRoleId = @appRoleId');
        return "Deleted correctly";
    } catch (error) {
        console.log('Function services/appUserAppRoleService/deleteAppUserAppRole error:', error);
        throw error;
    }
};

module.exports = {
    addAppUserAppRole,
    getAllAppUserAppRoles,
    deleteAppUserAppRole,
    getUserRoles
};
