const AppRolePermission = require('../../models/appRolePermissionModel.js');
const appRolePermissionService = require('../../services/appRolePermissionService.js');

const addAppRolePermission = async (req, res) => {
    try {
        const appRolePermission = new AppRolePermission(
            req.body.appRoleId,
            req.body.permissionId
        );
        const newAppRolePermission = await appRolePermissionService.addAppRolePermission(appRolePermission);
        res.status(200).json(newAppRolePermission);
    } catch (error) {
        console.error('Function controllers/appRolePermissionController error:', error);
        res.status(500).send('Error when adding a role permission to the database');
    }
};

const getAllAppRolePermissions = async (req, res) => {
    try {
        const allAppRolePermissions = await appRolePermissionService.getAllAppRolePermissions();
        res.status(200).json(allAppRolePermissions);
    } catch (error) {
        console.error('Function controllers/appRolePermissionController error:', error);
        res.status(500).send('Error when getting role permissions from the database');
    }
};

const deleteAppRolePermission = async (req, res) => {
    try {
        const status = await appRolePermissionService.deleteAppRolePermission(req.params.appRoleId, req.params.permissionId);
        res.status(200).json(status);
    } catch (error) {
        console.error('Function controllers/appRolePermissionController error:', error);
        res.status(500).send('Error when deleting role permission from the database');
    }
};

module.exports = {
    addAppRolePermission,
    getAllAppRolePermissions,
    deleteAppRolePermission
};
