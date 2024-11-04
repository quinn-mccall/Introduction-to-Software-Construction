const AppRole = require('../../models/appRoleModel.js');
const appRoleService = require('../../services/appRoleService.js');

const addRole = async (req, res) => {
    try {
        const appRole = new AppRole(
           req.body.id, 
           req.body.name,
           req.body.description,
           req.body.enabled
        );
        console.log("app role obj created")
        const role = await appRoleService.addRole(appRole);
        console.log("app role obj added to database")

        res.status(200).json(role);
        console.log("response sent")
    } catch (error) {
        console.error('Function controllers/appRole error:', error);
        res.status(500).send('Error when adding a role to the database');
    }
};

const getAllRoles = async (req, res) => {
    try {
        const allRoles = await appRoleService.getAllRoles();
        res.status(200).json(allRoles);
    } catch (error) {
        console.error('Function controllers/getAllRoles error:', error);
        res.status(500).send('Error when getting roles from the database');
    }
};

const updateRole = async (req, res) => {
    try {
        const appRole = new AppRole(
            req.body.id,
            req.body.name,
            req.body.description,
            req.body.enabled,
        );

        const status = await appRoleService.updateRole(appRole);
        //Update to success code after inserting
        res.status(200).json(status);
    } catch (error) {
        console.error('Function controllers/updateRole error:', error);
        res.status(500).send('Error when updating role from the database');
    }
};

const deleteRole = async (req, res) => {
    try {
        const role = await appRoleService.deleteRole(req.params.id);
        res.status(200).json(role);
    } catch (error) {
        console.error('Function controllers/deleteRole error:', error);
        res.status(500).send('Error when deleting role from the database');
    }
};

module.exports = {
    addRole,
    getAllRoles,
    updateRole,
    deleteRole
};