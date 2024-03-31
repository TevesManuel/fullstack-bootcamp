const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
});
  
const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;