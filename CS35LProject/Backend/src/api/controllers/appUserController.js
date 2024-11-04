const AppUserModel = require('../../models/appUserModel.js');
const appUserService = require('../../services/appUserService.js');

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await appUserService.getAllUsers();
        res.status(200).json(allUsers);
    } catch (error) {
        console.error('Function controllers/getAllUsers error:', error);
        res.status(500).send('Error when getting users from the database');
    }
};

const getUserById = async (req, res) => {
    try {
        console.log(req.id)
        const user = await appUserService.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        console.error('Function controllers/getUserById error:', error);
        res.status(500).send('Error when getting user from the database');
    }
};


const addUser = async (req, res) => {
    try {
        const appUser = new AppUserModel(
            req.body.id,
            req.body.firstName,
            req.body.lastName,
            req.body.username,
            req.body.password,
            req.body.address,
            req.body.email,
            req.body.phoneNumber,
            req.body.birthDate,
            req.body.gender,
            req.body.registrationDate,
            req.body.enabled,
        );
        const user = await appUserService.addUser(appUser);
        //Update to success code after inserting
        res.status(200).json(user);
    } catch (error) {
        console.error('Function controllers/addUser error:', error);
        res.status(500).send('Error when adding user from the database');
    }
};

const updateUser = async (req, res) => {
    try {
        const appUser = new AppUserModel(
            req.body.id,
            req.body.firstName,
            req.body.lastName,
            req.body.username,
            req.body.password,
            req.body.address,
            req.body.email,
            req.body.phoneNumber,
            req.body.birthDate,
            req.body.gender,
            req.body.registrationDate,
            req.body.enabled,
        );
        const user = await appUserService.updateUser(appUser);
        //Update to success code after inserting
        res.status(200).json(user);
    } catch (error) {
        console.error('Function controllers/updateUser error:', error);
        res.status(500).send('Error when updating user from the database');
    }
};

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const appUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        };

        const result = await appUserService.updateUserById(id, appUser);

        res.status(result.status).json({ message: result.message, user: result.user });
    } catch (error) {
        console.error('Function controllers/updateUserById error:', error);
        res.status(500).send('Error when updating user from the database');
    }
};
const deleteUser = async (req, res) => {
    try {
        const allUsers = await appUserService.deleteUser(req.params.id);
        res.status(200).json(allUsers);
    } catch (error) {
        console.error('Function controllers/deleteUser error:', error);
        res.status(500).send('Error when deleting user from the database');
    }
    
};

const login = async(req, res) => {
    try{
        const { username, password } = req.body;
        const isLoggedIn = await appUserService.login(req, username, password);
        if (isLoggedIn) {
            res.json({ exist: true, userId: req.session.user.id });
        } else {
            res.status(401).json({ exist: false });
        }
    }
    catch(error){
        console.error('Function controllers/login error:', error);
        res.status(500).send('Error ');
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    login,
    updateUserById
}