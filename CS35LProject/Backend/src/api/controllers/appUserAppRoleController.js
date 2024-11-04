const AppUserAppRole = require('../../models/appUserAppRoleModel.js');
const appUserAppRoleService = require('../../services/appUserAppRoleService.js');

const addAppUserAppRole = async (req, res) => {
    try {
        const appUserAppRole = new AppUserAppRole(
            req.body.appUserId,
            req.body.appRoleId
        );
        const newAppUserAppRole = await appUserAppRoleService.addAppUserAppRole(appUserAppRole);
        res.status(200).json(newAppUserAppRole);
    } catch (error) {
        console.error('Function controllers/appUserAppRoleController error:', error);
        res.status(500).send('Error when adding a user role to the database');
    }
};

const getAllAppUserAppRoles = async (req, res) => {
    try {
        const allAppUserAppRoles = await appUserAppRoleService.getAllAppUserAppRoles();
        res.status(200).json(allAppUserAppRoles);
    } catch (error) {
        console.error('Function controllers/appUserAppRoleController error:', error);
        res.status(500).send('Error when getting user roles from the database');
    }
};

const getUserRoles = async (req, res) => {
    try {
        const allAppUserAppRoles = await appUserAppRoleService.getUserRoles(req.params.appUserId);
        res.status(200).json(allAppUserAppRoles);
    } catch (error) {
        console.error('Function controllers/getUserRoles error:', error);
        res.status(500).send('Error when getting user roles from the database');
    }
};

const deleteAppUserAppRole = async (req, res) => {
    try {
        const status = await appUserAppRoleService.deleteAppUserAppRole(req.params.appUserId, req.params.appRoleId);
        res.status(200).json(status);
    } catch (error) {
        console.error('Function controllers/appUserAppRoleController error:', error);
        res.status(500).send('Error when deleting user role from the database');
    }
};

module.exports = {
    addAppUserAppRole,
    getAllAppUserAppRoles,
    deleteAppUserAppRole,
    getUserRoles
};
