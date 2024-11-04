const express = require('express');
const router =  express.Router();
const FTFController = require('../controllers/FTFController.js');

router.post('/ftf', FTFController.addFTF); 
router.get('/ftf', FTFController.getAllFTFs); 
router.put('/ftf', FTFController.updateFTF);
router.delete('/ftf/:id', FTFController.deleteFTF);
router.post('/ftf', FTFController.addFTF); 
module.exports = router;