const mongoose = require('mongoose');

const PhoneModel = require('./../Models/Phone');
const controllerErrors = require('./../error');

/**
 * @param {PhoneModel} phoneModel
 */
const createPhone = (phoneModel) => {
    return phoneModel.save().then(result => {
        return result;
    }).catch(() => {
        return new controllerErrors.DatabaseInternalError(err);
    });
};

const getAllPhones = () => {
    return PhoneModel.find({}).catch(err => {
        return new controllerErrors.DatabaseInternalError(err);
    });
};

/**
 * @param {Number} phoneId
 */
const getPhoneById = (phoneId) => {
    return PhoneModel.findById(phoneId).then(note => {
        if(note)
            return note;
        else
            return new controllerErrors.NotFoundError(phoneId);
    }).catch(err => {
        return new controllerErrors.DatabaseInternalError(err);
    })
};

const getPhoneLength = () => {
    return PhoneModel.countDocuments({}).catch((err) => {
        return new controllerErrors.DatabaseInternalError(err);
    });
};

const deletePhone = (phoneId) => {
    return PhoneModel.findByIdAndDelete(phoneId).then(() => {
        return true;
    }).catch((err) => {
        return new controllerErrors.DatabaseInternalError(err);
    });
};

module.exports.createPhone    = createPhone;
module.exports.getAllPhones   = getAllPhones;
module.exports.getPhoneById   = getPhoneById;
module.exports.getPhoneLength = getPhoneLength;
module.exports.deletePhone    = deletePhone;