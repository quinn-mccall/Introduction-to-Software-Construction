const express = require('express');
const router = express.Router();

const permissionController = require('../controllers/permissionController.js');

router.post('/permission', permissionController.addPermission);

router.get('/permission', permissionController.getAllPermissions);

router.put('/permission', permissionController.updatePermission);

router.delete('/permission/:id', permissionController.deletePermission);

module.exports = router;
