const mongoose = require('mongoose');
const logger   = require('./logger');

const url      = require('./config').DB_URL;

const setup_db = () => {
    mongoose.set('strictQuery', false);
    process.on('exit', () => turn_off());
    console.log('Connecting to', url)
    return mongoose.connect(url).then((result) => result ? logger.info('[i] DB connected.') : logger.info('[!] Can\'t connect to the DB.'));
};

const turn_off = () => {
    logger.info('[i] DB disconnected.');
    mongoose.connection.close();
};

module.exports.setup_db = setup_db;
module.exports.turn_off = turn_off;