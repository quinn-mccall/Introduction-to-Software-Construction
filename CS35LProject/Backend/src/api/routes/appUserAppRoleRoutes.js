const express = require('express');
const router = express.Router();
const appUserAppRoleController = require('../controllers/appUserAppRoleController.js');

/**
 * @swagger
 * /user-role:
 *   post:
 *     summary: Create a new user-role association
 *     tags: [User-Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appUserId:
 *                 type: integer
 *                 example: 1
 *               appRoleId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: User-role association created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 appUserId:
 *                   type: integer
 *                   example: 1
 *                 appRoleId:
 *                   type: integer
 *                   example: 2
 *       500:
 *         description: Error when adding a user role to the database
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error when adding a user role to the database"
 */
router.post('/user-role', appUserAppRoleController.addAppUserAppRole);

/**
 * @swagger
 * /user-role/{appUserId}:
 *   get:
 *     summary: Retrieve roles by user ID
 *     tags: [User-Role]
 *     parameters:
 *       - in: path
 *         name: appUserId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of roles for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   appUserId:
 *                     type: integer
 *                     example: 1
 *                   appRoleId:
 *                     type: integer
 *                     example: 2
 *       500:
 *         description: Error when getting user roles from the database
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error when getting user roles from the database"
 */
router.get('/user-role/:appUserId', appUserAppRoleController.getUserRoles);

/**
 * @swagger
 * /user-role:
 *   get:
 *     summary: Retrieve all user-role associations
 *     tags: [User-Role]
 *     responses:
 *       200:
 *         description: A list of all user-role associations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   appUserId:
 *                     type: integer
 *                     example: 1
 *                   appRoleId:
 *                     type: integer
 *                     example: 2
 *       500:
 *         description: Error when getting user-role associations from the database
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error when getting user-role associations from the database"
 */
router.get('/user-role', appUserAppRoleController.getAllAppUserAppRoles);

/**
 * @swagger
 * /user-role/{appUserId}/{appRoleId}:
 *   delete:
 *     summary: Delete a user-role association by user ID and role ID
 *     tags: [User-Role]
 *     parameters:
 *       - in: path
 *         name: appUserId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *       - in: path
 *         name: appRoleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The role ID
 *     responses:
 *       200:
 *         description: User-role association deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 appUserId:
 *                   type: integer
 *                   example: 1
 *                 appRoleId:
 *                   type: integer
 *                   example: 2
 *       500:
 *         description: Error when deleting user-role association from the database
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error when deleting user-role association from the database"
 */
router.delete('/user-role/:appUserId/:appRoleId', appUserAppRoleController.deleteAppUserAppRole);

module.exports = router;

