const express = require('express');
const router =  express.Router();

const appRoleController = require('../controllers/appRoleController.js');

router.post('/role', appRoleController.addRole); 

router.get('/role', appRoleController.getAllRoles); 

router.put('/role', appRoleController.updateRole); 

router.delete('/role/:id', appRoleController.deleteRole); 

module.exports = router;