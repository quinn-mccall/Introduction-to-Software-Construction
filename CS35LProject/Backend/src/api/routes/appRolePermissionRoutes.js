const express = require('express');
const router = express.Router();

const appRolePermissionController = require('../controllers/appRolePermissionController.js');

router.post('/role-permission', appRolePermissionController.addAppRolePermission);

router.get('/role-permission', appRolePermissionController.getAllAppRolePermissions);

router.delete('/role-permission/:appRoleId/:permissionId', appRolePermissionController.deleteAppRolePermission);

module.exports = router;
