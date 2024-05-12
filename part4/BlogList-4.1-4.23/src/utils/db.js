const mongoose = require('mongoose');
const logger   = require('./logger');
const config   = require('./config');
const db_url   = `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@cluster0.ythuy5f.mongodb.net/${config.DB_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`;

const setup_db = () => {
    mongoose.set('strictQuery', false);
    process.on('exit', () => turn_off());
    // console.log('Connecting to', db_url);
    return mongoose.connect(db_url).then((result) => result ? logger.info('[i] DB connected.') : logger.info('[!] Can\'t connect to the DB.'));
};

const turn_off = () => {
    logger.info('[i] DB disconnected.');
    mongoose.connection.close();
};

module.exports.setup_db = setup_db;
module.exports.turn_off = turn_off;