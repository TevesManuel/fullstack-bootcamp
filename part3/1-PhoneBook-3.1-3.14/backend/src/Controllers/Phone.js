const mongoose = require('mongoose');

const PhoneModel = require('./../Models/Phone');

/**
 * @param {PhoneModel} phoneModel
 */
const createPhone = (phoneModel) => {
    return phoneModel.save().then(result => {
        return result;
    });
};

const getAllPhones = () => {
    return PhoneModel.find({});
};

/**
 * @param {Number} phoneId
 */
const getPhoneById = (phoneId) => {
    return PhoneModel.findById(phoneId);
};

const getPhoneLength = () => {
    return PhoneModel.countDocuments({});
};

module.exports.createPhone    = createPhone;
module.exports.getAllPhones   = getAllPhones;
module.exports.getPhoneById   = getPhoneById;
module.exports.getPhoneLength = getPhoneLength;