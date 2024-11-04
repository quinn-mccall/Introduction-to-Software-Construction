const BudgetModel = require('../../models/budgetModel.js');
const BudgetService = require('../../services/budgetService.js')

const getAllBudgets = async (req, res) => {
    try {
        const allBudgets = await BudgetService.getAllBudgets();
        res.status(200).json(allBudgets);
    } catch (error) {
        console.error('Function controllers/getAllBudgets error:', error);
        res.status(500).send('Error when getting Budgets from the database');
    }
};

const getBudgetByUserId = async (req, res) => {
    try {
        const allBudgets = await BudgetService.getBudgetByUserId(req.params.appUserId);
        res.status(200).json(allBudgets);
    } catch (error) {
        console.error('Function controllers/getBudgetByUserId error:', error);
        res.status(500).send('Error when getting Budgets for user from the database');
    }
};

const addBudget = async (req, res) => {
    try {
        const Budget = new BudgetModel(
            req.body.id,
            req.body.userId,
            req.body.amount,
            req.body.month,
            req.body.year,
            req.body.registrationDate
        );
        const budget = await BudgetService.addBudget(Budget);
        //Update to success code after inserting
        res.status(200).json(budget);
    } catch (error) {
        console.error('Function controllers/addBudget error:', error);
        res.status(500).send('Error when adding Budget from the database');
    }
};



const getBudgetById = async (req, res) => {
    try {
        console.log(req.id)
        const budget = await BudgetService.getBudgetById(req.params.id);
        res.status(200).json(budget);
    } catch (error) {
        console.error('Function controllers/getBudgetById error:', error);
        res.status(500).send('Error when getting budget from the database');
    }
};


const updateBudget = async (req, res) => {
    try {
        const budget = new BudgetModel(
            req.body.id,
            req.body.userId,
            req.body.amount,
            req.body.month,
            req.body.year,
            req.body.registrationDate
        );
        const fixedBudget = await BudgetService.updateBudget(budget);
        res.status(200).json(fixedBudget);
    } catch (error) {
        console.error('Function controllers/updateBudget error:', error);
        res.status(500).send('Error when updating budget from the database');
    }
};

const addOrUpdateBudget = async (req, res) => {
    try {
        const budget = req.body;
        const updatedBudget = await BudgetService.addOrUpdateBudget(budget);
        res.status(200).json(updatedBudget);
    } catch (error) {
        console.error('Error in addOrUpdateBudget:', error);
        res.status(500).send('An error occurred while updating the budget');
    }
};

const deleteBudget = async (req, res) => {
    try {
        const allBudgets = await BudgetService.deleteBudget(req.params.id);
        res.status(200).json(allBudgets);
    } catch (error) {
        console.error('Function controllers/deleteBudget error:', error);
        res.status(500).send('Error when deleting budget from the database');
    }
    
};

//////////////
const getBudgetByUserIdAndMonth = async (req, res) => {
    try {
        const budget = await BudgetService.getBudgetByUserIdAndMonth(req.params.appUserId, req.params.month, req.params.year);
        res.status(200).json(budget);
    } catch (error) {
        console.error('Function controllers/getBudgetByUserIdAndMonth error:', error);
        res.status(500).send('Error when getting Budget for user from the database');
    }
};

module.exports = {
    getAllBudgets,
    addBudget,
    getBudgetById,
    updateBudget,
    deleteBudget,
    getBudgetByUserId,
    getBudgetByUserIdAndMonth,
    addOrUpdateBudget
}