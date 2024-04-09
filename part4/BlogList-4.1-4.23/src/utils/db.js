const mongoose = require('mongoose');
const logger   = require('./logger');

const url      = require('./config').DB_URL;

module.exports.setup_db = () => {
    mongoose.set('strictQuery', false);
    process.on('exit', () => db.turn_off());
    process.on('uncaughtException', () => db.turn_off());
    return mongoose.connect(url).then((result) => result !== undefined ? logger.info('[i] DB connected.') : logger.info('[!] Can\'t connect to the DB.'));
};
module.exports.turn_off = () => {
    logger.info('[i] DB disconnected.');
    mongoose.connection.close();
};