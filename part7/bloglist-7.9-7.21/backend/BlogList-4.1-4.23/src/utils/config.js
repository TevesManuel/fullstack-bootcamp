require('dotenv').config();

const saltRoundsHash = 10;
const SECRET = process.env.SECRET;
const PORT = process.env.PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.NODE_ENV === 'test'
    ? 'Tests'
    : 'blogApp';

module.exports = {
    PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE,
    SECRET,
    saltRoundsHash,
};