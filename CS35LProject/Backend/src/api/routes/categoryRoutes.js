const express = require('express');
const router =  express.Router();

const categoryController = require('../controllers/categoryController.js');
const isAuthenticated = require('../controllers/authMiddleware');

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               appUserId:
 *                 type: integer
 *                 example: 10
 *               name:
 *                 type: string
 *                 example: Groceries
 *               type:
 *                 type: string
 *                 example: E
 *               description:
 *                 type: string
 *                 example: Monthly grocery expenses
 *               enabled:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Category created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 appUserId:
 *                   type: integer
 *                   example: 10
 *                 name:
 *                   type: string
 *                   example: Groceries
 *                 type:
 *                   type: string
 *                   example: E
 *                 description:
 *                   type: string
 *                   example: Monthly grocery expenses
 *                 enabled:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Error when adding category to the database
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error when adding category to the database"
 */
router.post('/category', categoryController.addCategory);

/**
 * @swagger
 * /category/{appUserId}:
 *   get:
 *     summary: Retrieve categories by user ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: appUserId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of categories for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   appUserId:
 *                     type: integer
 *                     example: 10
 *                   name:
 *                     type: string
 *                     example: Groceries
 *                   type:
 *                     type: string
 *                     example: E
 *                   description:
 *                     type: string
 *                     example: Monthly grocery expenses
 *                   enabled:
 *                     type: boolean
 *                     example: true
 *       500:
 *         description: Error when retrieving categories from the database
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error when retrieving categories from the database"
 */
router.get('/categories/:appUserId', categoryController.getCategoriesByUserId);

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: A list of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   appUserId:
 *                     type: integer
 *                     example: 10
 *                   name:
 *                     type: string
 *                     example: Groceries
 *                   type:
 *                     type: string
 *                     example: E
 *                   description:
 *                     type: string
 *                     example: Monthly grocery expenses
 *                   enabled:
 *                     type: boolean
 *                     example: true
 *       500:
 *         description: Error when retrieving categories from the database
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error when retrieving categories from the database"
 */
router.get('/category', categoryController.getAllCategories);

/**
 * @swagger
 * /category/{id}/{appUserId}:
 *   get:
 *     summary: Retrieve a category by ID and user ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The category ID
 *       - in: path
 *         name: appUserId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A category for the specified ID and user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 appUserId:
 *                   type: integer
 *                   example: 10
 *                 name:
 *                   type: string
 *                   example: Groceries
 *                 type:
 *                   type: string
 *                   example: E
 *                 description:
 *                   type: string
 *                   example: Monthly grocery expenses
 *                 enabled:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Error when retrieving category from the database
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error when retrieving category from the database"
 */
router.get('/category/:id', categoryController.getCategoryById);
router.get('/category/:name/:appUserId', categoryController.getCategoriesByName);

/**
 * @swagger
 * /category:
 *   put:
 *     summary: Update an existing category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               appUserId:
 *                 type: integer
 *                 example: 10
 *               name:
 *                 type: string
 *                 example: Groceries
 *               type:
 *                 type: string
 *                 example: E
 *               description:
 *                 type: string
 *                 example: Monthly grocery expenses
 *               enabled:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Category updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 appUserId:
 *                   type: integer
 *                   example: 10
 *                 name:
 *                   type: string
 *                   example: Groceries
 *                 type:
 *                   type: string
 *                   example: E
 *                 description:
 *                   type: string
 *                   example: Monthly grocery expenses
 *                 enabled:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Error when updating category in the database
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error when updating category in the database"
 */
router.put('/category', categoryController.updateCategory);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 appUserId:
 *                   type: integer
 *                   example: 10
 *                 name:
 *                   type: string
 *                   example: Groceries
 *                 type:
 *                   type: string
 *                   example: E
 *                 description:
 *                   type: string
 *                   example: Monthly grocery expenses
 *                 enabled:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Error when deleting category from the database
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error when deleting category from the database"
 */
router.delete('/category/:id', categoryController.deleteCategoryById);

module.exports = router;
