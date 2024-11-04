const express = require('express');
const router =  express.Router();

const isAuthenticated = require('../controllers/authMiddleware');

const appUserController = require('../controllers/appUserController.js');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [AppUser]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "30010"
 *                   firstName:
 *                     type: string
 *                     example: "UserNameModified1"
 *                   lastName:
 *                     type: string
 *                     example: "Last1"
 *                   username:
 *                     type: string
 *                     example: "user1"
 *                   password:
 *                     type: string
 *                     example: "1234"
 *                   address:
 *                     type: string
 *                     example: "330 DeNeve Dr"
 *                   email:
 *                     type: string
 *                     example: "u1@test.com"
 *                   phoneNumber:
 *                     type: string
 *                     example: "3101112222"
 *                   birthDate:
 *                     type: string
 *                     format: date
 *                     example: "1983-06-08T00:00:00.000Z"
 *                   gender:
 *                     type: string
 *                     example: "M"
 *                   registrationDate:
 *                     type: string
 *                     format: date
 *                     example: "2024-05-19T13:35:06.380Z"
 *                   enabled:
 *                     type: boolean
 *                     example: true
 *       500:
 *         description: Error when getting users from the database
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error when getting users from the database"
 */
router.get('/users', appUserController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags: [AppUser]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "30010"
 *                 firstName:
 *                   type: string
 *                   example: "UserNameModified1"
 *                 lastName:
 *                   type: string
 *                   example: "Last1"
 *                 username:
 *                   type: string
 *                   example: "user1"
 *                 password:
 *                   type: string
 *                   example: "1234"
 *                 address:
 *                   type: string
 *                   example: "330 DeNeve Dr"
 *                 email:
 *                   type: string
 *                   example: "u1@test.com"
 *                 phoneNumber:
 *                   type: string
 *                   example: "3101112222"
 *                 birthDate:
 *                   type: string
 *                   format: date
 *                   example: "1983-06-08T00:00:00.000Z"
 *                 gender:
 *                   type: string
 *                   example: "M"
 *                 registrationDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-05-19T13:35:06.380Z"
 *                 enabled:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Error when getting user from the database
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error when getting user from the database"
 */
router.get('/users/:id', appUserController.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [AppUser]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: null
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: password123
 *               address:
 *                 type: string
 *                 example: 123 Main St
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               phoneNumber:
 *                 type: string
 *                 example: 123-456-7890
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-01
 *               gender:
 *                 type: string
 *                 example: Male
 *               registrationDate:
 *                 type: string
 *                 format: date
 *                 example: 2023-01-01
 *               enabled:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: "Returns the JSON object just created"
 *       500:
 *         description: Error when adding user to the database
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error when adding user to the database"
 */
router.post('/users', appUserController.addUser);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update an existing user
 *     tags: [AppUser]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: null
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: password123
 *               address:
 *                 type: string
 *                 example: 123 Main St
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               phoneNumber:
 *                 type: string
 *                 example: 123-456-7890
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-01
 *               gender:
 *                 type: string
 *                 example: Male
 *               registrationDate:
 *                 type: string
 *                 format: date
 *                 example: 2023-01-01
 *               enabled:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Updated correctly"
 *       500:
 *         description: Error when updating user in the database
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error when updating user in the database"
 */
router.put('/users', isAuthenticated, appUserController.updateUser);
router.put('/users/:id',  appUserController.updateUserById);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [AppUser]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Deleted correctly"
 *       500:
 *         description: Error when deleting user from the database
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error when deleting user from the database"
 */
router.delete('/users/:id', isAuthenticated, appUserController.deleteUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [AppUser]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: user1
 *               password:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 existe:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 existe:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Error during login process
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error during login process"
 */
router.post('/login', appUserController.login);


module.exports = router;