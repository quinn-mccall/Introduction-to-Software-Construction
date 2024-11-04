const AppUser = require('../models/appUserModel.js');
//Manipulacion de base
const { getConnection, sql } = require('../config/database.js');

//The functions that use services are async because are working with the database
//because JS work with promises
const getAllUsers = async () => {
    try {
        //Pool to be an instance of connection *
        const pool = await getConnection(); //Await because the getConnection function is async
        const result = await pool.request().query('SELECT * FROM AppUser');
        return result.recordset.map(record => new AppUser(
            record.id,
            record.firstName,
            record.lastName,
            record.username,
            record.password,
            record.address,
            record.email,
            record.phoneNumber,
            record.birthDate,
            record.gender,
            record.registrationDate,
            record.enabled
        ));
    } catch (error) {
        console.log('Function services/getAllUsers error:', error);
        throw error;
    }
};

const getUserById = async (id) => {
    try {
        const pool = await getConnection();
        const result = await pool.request() //The following lines are a dynamic query
            .input('idArg', sql.BigInt, id) //Creates SQL argument 'idArg' with the 'id' passed to the function
            .query('SELECT * FROM AppUser WHERE id = @idArg');
        const record = result.recordset[0];
        //console.log({record})
        if (record) {
            return new AppUser(
                record.id,
                record.firstName,
                record.lastName,
                record.username,
                record.password,
                record.address,
                record.email,
                record.phoneNumber,
                record.birthDate,
                record.gender,
                record.registrationDate,
                record.enabled
            );
        }
    } catch (error) {
        console.log('Function services/getUserById error:', error);
        throw error;
    }
};

const addUser = async (appUser) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('firstName', sql.VarChar(100), appUser.firstName)
            .input('lastName', sql.VarChar(100), appUser.lastName)
            .input('username', sql.VarChar(50), appUser.username)
            .input('password', sql.VarChar(500), appUser.password)
            .input('address', sql.VarChar(200), appUser.address)
            .input('email', sql.VarChar(200), appUser.email)
            .input('phoneNumber', sql.VarChar(50), appUser.phoneNumber)
            .input('birthDate', sql.Date, appUser.birthDate)
            .input('gender', sql.VarChar(1), appUser.gender)
            .input('enabled', sql.Bit, appUser.enabled)
            //Query to insert into database
            .query(`INSERT INTO AppUser (firstName, lastName, username, password, address, email, phoneNumber, birthDate, gender, enabled) VALUES (@firstName, @lastName, @username, @password, @address, @email, @phoneNumber, @birthDate, @gender, @enabled);
            SELECT SCOPE_IDENTITY() as id;`); //Scope identity returns id of the new user added

        new AppUser(
            result.recordset[0].id,
            appUser.firstName,
            appUser.lastName,
            appUser.username,
            appUser.password,
            appUser.address,
            appUser.email,
            appUser.phoneNumber,
            appUser.birthDate,
            appUser.gender,
            new Date(),
            appUser.enabled
        );

    } catch (error) {
        console.log('Function services/addUser error:', error);
        throw error;
    }
};

const updateUser = async (appUser) => {
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.BigInt, appUser.id)
            .input('firstName', sql.VarChar(100), appUser.firstName)
            .input('lastName', sql.VarChar(100), appUser.lastName)
            .input('password', sql.VarChar(500), appUser.password)
            .input('address', sql.VarChar(200), appUser.address)
            .input('email', sql.VarChar(200), appUser.email)
            .input('phoneNumber', sql.VarChar(50), appUser.phoneNumber)
            .input('birthDate', sql.Date, appUser.birthDate)
            .input('gender', sql.VarChar(1), appUser.gender)
            .input('enabled', sql.Bit, appUser.enabled)
            .query('UPDATE AppUser SET firstName = @firstName, lastName = @lastName, username = @username, password = @password, address = @address, email = @email, phoneNumber = @phoneNumber, birthDate = @birthDate, gender = @gender, enabled = @enabled WHERE id = @id');
        return getUserById(id);
    } catch (error) {
        console.log('Function services/updateUser error:', error);
        throw error;
    }
};

const updateUserById = async (id, appUser) => {
    try {
        const pool = await getConnection();
        const userResult = await pool.request()
            .input('id', sql.BigInt, id)
            .query('SELECT * FROM appUser WHERE id = @id');

        if (userResult.recordset.length === 0) {
            console.log('User not found.');
            return { message: 'User not found', status: 404 };
        }

        let query = 'UPDATE appUser SET ';
        const inputParams = [];

        if (appUser.firstName) {
            query += 'firstName = @firstName, ';
            inputParams.push({ name: 'firstName', type: sql.VarChar, value: appUser.firstName });
        }

        if (appUser.lastName) {
            query += 'lastName = @lastName, ';
            inputParams.push({ name: 'lastName', type: sql.VarChar, value: appUser.lastName });
        }

        if (appUser.password) {
            query += 'password = @password, ';
            inputParams.push({ name: 'password', type: sql.VarChar, value: appUser.password });
        }

        // Remove the trailing comma and space
        query = query.slice(0, -2);
        query += ' WHERE id = @id';

        const request = pool.request().input('id', sql.BigInt, id);

        // Add the input parameters to the request
        inputParams.forEach(param => {
            request.input(param.name, param.type, param.value);
        });

        await request.query(query);

        return { message: 'User updated successfully', status: 200 };
    } catch (error) {
        console.log('Function services/updateUserById error:', error);
        return { message: 'Internal server error', status: 500 };
    }
};

const deleteUser = async (id) => {
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.BigInt, id)
            .query('DELETE FROM AppUser WHERE id = @id');
        return "Deleted correctly";
    } catch (error) {
        console.log('Function services/deleteUser error:', error);
        throw error;
    }
};

const login = async (req, username, password) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('username', sql.VarChar(50), username)
            .input('pass', sql.VarChar(500), password)
            .query(`SELECT id, username FROM AppUser WHERE username=@username AND password=@pass`);

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            req.session.user = {
                id: user.id,
                username: user.username
            };
            return true;
        }
        return false;
    } catch (error) {
        console.log('Function services/appUserService/login error:', error);
        throw error;
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    login,
    updateUserById
};