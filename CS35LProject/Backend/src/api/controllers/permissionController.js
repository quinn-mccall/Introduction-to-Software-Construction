const Permission = require('../../models/permissionModel.js');
const permissionService = require('../../services/permissionService.js');

const addPermission = async (req, res) => {
    try {
        const permission = new Permission(
            req.body.id,
            req.body.name,
            req.body.description,
            req.body.enabled
        );
        const newPermission = await permissionService.addPermission(permission);
        res.status(200).json(newPermission);
    } catch (error) {
        console.error('Function controllers/permissionController error:', error);
        res.status(500).send('Error when adding a permission to the database');
    }
};

const getAllPermissions = async (req, res) => {
    try {
        const allPermissions = await permissionService.getAllPermissions();
        res.status(200).json(allPermissions);
    } catch (error) {
        console.error('Function controllers/permissionController error:', error);
        res.status(500).send('Error when getting permissions from the database');
    }
};

const updatePermission = async (req, res) => {
    try {
        const permission = new Permission(
            req.body.id,
            req.body.name,
            req.body.description,
            req.body.enabled
        );
        const status = await permissionService.updatePermission(permission);
        res.status(200).json(status);
    } catch (error) {
        console.error('Function controllers/permissionController error:', error);
        res.status(500).send('Error when updating permission from the database');
    }
};

const deletePermission = async (req, res) => {
    try {
        const status = await permissionService.deletePermission(req.params.id);
        res.status(200).json(status);
    } catch (error) {
        console.error('Function controllers/permissionController error:', error);
        res.status(500).send('Error when deleting permission from the database');
    }
};

module.exports = {
    addPermission,
    getAllPermissions,
    updatePermission,
    deletePermission
};
