const CategoryModel = require('../../models/categoryModel.js');
const categoryService = require('../../services/categoryService.js');

const addCategory = async (req, res) => {
    try {
        const category = new CategoryModel(
            req.body.id,
            req.body.appUserId,
            req.body.name,
            req.body.type,
            req.body.description,
            req.body.enabled
        );
        console.log(category);
        const newCategory = await categoryService.addCategory(category);
        res.status(200).json(newCategory);
    } catch (error) {
        console.error('Function controllers/addCategory error:', error);
        res.status(500).send('Error when adding category to the database');
    }
};

const getCategoriesByUserId = async (req, res) => {
    try {
        const categories = await categoryService.getCategoriesByUserId(req.params.appUserId);
        res.status(200).json(categories);
    } catch (error) {
        console.error('Function controllers/getCategoriesByUserId error:', error);
        res.status(500).send('Error when getting categories from the database');
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        console.error('Function controllers/getCategoryById error:', error);
        res.status(500).send('Error when getting category from the database');
    }
};

const getCategoriesByName = async (req, res) => {
    try {
        const category = await categoryService.getCategoriesByName(req.params.name);
        res.status(200).json(category);
    } catch (error) {
        console.error('Function controllers/getCategoryByName error:', error);
        res.status(500).send('Error when getting category from the database');
    }
};

const getAllCategories = async (req, res) => {
    try {
        const allCategories = await categoryService.getAllCategories();
        res.status(200).json(allCategories);
    } catch (error) {
        console.error('Function controllers/getAllCategories error:', error);
        res.status(500).send('Error when getting categories from the database');
    }
};


const updateCategory = async (req, res) => {
    try {
        const category = new CategoryModel(
            req.body.id,
            req.body.appUserId,
            req.body.name,
            req.body.type,
            req.body.description,
            req.body.enabled
        );
        const updatedCategory = await categoryService.updateCategory(category);
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error('Function controllers/updateCategory error:', error);
        res.status(500).send('Error when updating category in the database');
    }
};

const deleteCategoryById = async (req, res) => {
    try {
        const result = await categoryService.deleteCategoryById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        console.error('Function controllers/deleteCategoryById error:', error);
        res.status(500).send('Error when deleting category from the database');
    }
};

module.exports = {
    getAllCategories,
    getCategoriesByUserId,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategoryById,
    getCategoriesByName
};