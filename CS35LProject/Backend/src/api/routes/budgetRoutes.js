const express = require('express');
const router =  express.Router();
const budgetController = require('../controllers/budgetController.js');

router.get('/budgets', budgetController.getAllBudgets);

router.get('/budget-user/:appUserId', budgetController.getBudgetByUserId);

router.get('/budgets/:id', budgetController.getBudgetById);

//router.put('/budgets', budgetController.updateBudget);
router.put('/budgets', budgetController.addOrUpdateBudget);

router.delete('/budgets/:id', budgetController.deleteBudget);

router.post('/budgets', budgetController.addBudget);

router.get('/budget-month/:appUserId/:month/:year', budgetController.getBudgetByUserIdAndMonth);

module.exports = router;