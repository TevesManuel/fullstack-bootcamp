const mongoose = require('mongoose');

import normalize from 'normalize-mongoose';

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
});
console.log("norm", normalize);
phoneSchema.plugin(normalize);

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;