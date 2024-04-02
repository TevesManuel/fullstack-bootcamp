const mongoose = require('mongoose')
require('dotenv').config();

const url = process.env.DB_URL

module.exports.setup_db = () => {
    mongoose.set('strictQuery', false);
    return mongoose.connect(url).then((result) => result != undefined ? console.log("[i] DB connected.") : console.log("[!] Can't connect to the DB."));    
}
module.exports.turn_off = () => {
    console.log("[i] DB disconnected.");
    mongoose.connection.close();
}