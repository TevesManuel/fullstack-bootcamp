const mongoose = require('mongoose');

const Phone = require('./../Models/Phone');

/**
 * @param {Phone} phoneModel
 */
const createPhone = (phoneModel) => {
    return phoneModel.save().then(result => {
        return result;
    });
};

const getAllPhones = () => {
    return Phone.find({});
};

/**
 * @param {Number} phoneId
 */
const getPhoneById = (phoneId) => {
    return Phone.findById(phoneId);
};

module.exports.createPhone  = createPhone;
module.exports.getAllPhones = getAllPhones;
module.exports.getPhoneById = getPhoneById;