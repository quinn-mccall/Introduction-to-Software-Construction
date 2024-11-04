const AppRolePermission = require('../models/appRolePermissionModel.js');
// Manipulacion de base
const { getConnection, sql } = require('../config/database.js');

const addAppRolePermission = async (appRolePermission) => {
    try {
        const pool = await getConnection();
        await pool.request()
            .input('appRoleId', sql.Int, appRolePermission.appRoleId)
            .input('permissionId', sql.BigInt, appRolePermission.permissionId)
            .query('INSERT INTO AppRolePermission (appRoleId, permissionId) VALUES (@appRoleId, @permissionId)');
        return appRolePermission;
    } catch (error) {
        console.log('Function services/appRolePermissionService/addAppRolePermission error:', error);
        throw error;
    }
};

const getAllAppRolePermissions = async () => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM AppRolePermission');
        return result.recordset.map(record => new AppRolePermission(
            record.appRoleId,
            record.permissionId
        ));
    } catch (error) {
        console.log('Function services/appRolePermissionService/getAllAppRolePermissions error:', error);
        throw error;
    }
};

const deleteAppRolePermission = async (appRoleId, permissionId) => {
    try {
        const pool = await getConnection();
        await pool.request()
            .input('appRoleId', sql.Int, appRoleId)
            .input('permissionId', sql.BigInt, permissionId)
            .query('DELETE FROM AppRolePermission WHERE appRoleId = @appRoleId AND permissionId = @permissionId');
        return "Deleted correctly";
    } catch (error) {
        console.log('Function services/appRolePermissionService/deleteAppRolePermission error:', error);
        throw error;
    }
};

module.exports = {
    addAppRolePermission,
    getAllAppRolePermissions,
    deleteAppRolePermission
};
