require('dotenv').config();

const saltRoundsHash = 10;
const SECRET = process.env.SECRET;
const PORT = process.env.PORT;
const DB_URL = process.env.NODE_ENV === 'test'
    ? process.env.TEST_DB_URL
    : process.env.DB_URL;

module.exports = {
    PORT,
    DB_URL,
    SECRET,
    saltRoundsHash,
};