const FTFModel = require('../../models/FTFModel.js');
const FTFService = require('../../services/FTFService.js')

const getAllFTFs = async (req, res) => {
    try {
        const allFTFs = await FTFService.getAllFTFs();
        res.status(200).json(allFTFs);
    } catch (error) {
        console.error('Function controllers/getAllFTFs error:', error);
        res.status(500).send('Error when getting FTFs from the database');
    }
};

const addFTF = async (req, res) => {
    try {
        const FTF = new FTFModel(
            req.body.id,
            req.body.appUserId,
            req.body.categoryId,
            req.body.amount,
            req.body.registrationDate,
            req.body.frequency,
            req.body.dayOfMonth,
            req.body.description,
            req.body.enabled
        );
        const ftf= await FTFService.addFTF(FTF);
        //Update to success code after inserting
        res.status(200).json(ftf);
    } catch (error) {
        console.error('Function controllers/addFTF error:', error);
        res.status(500).send('Error when adding FTF from the database');
    }
};

const getFTFById = async (req, res) => {
    try {
        console.log(req.id)
        const ftf = await FTFService.getFTFById(req.params.id);
        res.status(200).json(ftf);
    } catch (error) {
        console.error('Function controllers/getFTFById error:', error);
        res.status(500).send('Error when getting FTF from the database');
    }
};


const updateFTF = async (req, res) => {
    try {
        const ftf = new FTFModel(
            req.body.id,
            req.body.appUserId,
            req.body.categoryId,
            req.body.amount,
            req.body.registrationDate,
            req.body.frequency,
            req.body.dayOfMonth,
            req.body.description,
            req.body.enabled
        );
        const fixedFTF = await FTFService.updateFTF(ftf);
        //Update to success code after inserting
        res.status(200).json(fixedFTF);
    } catch (error) {
        console.error('Function controllers/updateFTF error:', error);
        res.status(500).send('Error when updating FTF from the database');
    }
};

const deleteFTF = async (req, res) => {
    try {
        const allFTFs = await FTFService.deleteFTF(req.params.id);
        res.status(200).json(allFTFs);
    } catch (error) {
        console.error('Function controllers/deleteFTFs error:', error);
        res.status(500).send('Error when deleting FTF from the database');
    }
    
};




module.exports = {
    getAllFTFs,
    addFTF,
    getFTFById,
    updateFTF,
    deleteFTF
}