const sql = require('mssql');
const constants = require('../../../constants')

const config = {

    user: constants.DB_USER,
    password: constants.DB_PASSWORD,
    server: constants.DB_SERVER,
    database: constants.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

async function getConnection() {
    try {
        const pool = await sql.connect(config);
        return pool;
    } catch (error) {
        console.log('Connection error:', error);
        throw error;
    }
}

module.exports = {
    getConnection,
    sql
}