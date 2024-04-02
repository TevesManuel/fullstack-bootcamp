const mongoose = require('mongoose');

const PhoneModel = require('./../Models/Phone');
const controllerErrors = require('./../error');

const validateModel = (phoneModel) => {
    if(phoneModel.name == null)
        throw new controllerErrors.KeyError('name');
    if(phoneModel.number == null)
        throw new controllerErrors.KeyError('number');
}

/**
 * @param {PhoneModel} phoneModel
 */
const createPhone = (phoneModel) => {
    validateModel(phoneModel);
    return phoneModel.save().then(result => {
        return result;
    }).catch((err) => {
        throw new controllerErrors.DatabaseInternalError(err);
    });
};

const getAllPhones = () => {
    return PhoneModel.find({}).catch(err => {
        throw new controllerErrors.DatabaseInternalError(err);
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
            throw new controllerErrors.NotFoundError(phoneId);
    }).catch(err => {
        throw new controllerErrors.DatabaseInternalError(err);
    })
};

const getPhoneLength = () => {
    return PhoneModel.countDocuments({}).catch((err) => {
        throw new controllerErrors.DatabaseInternalError(err);
    });
};

/**
 * @param {Number} phoneId
 */
const deletePhone = (phoneId) => {
    return PhoneModel.findByIdAndDelete(phoneId).then(() => {
        return 204;
    }).catch((err) => {
        throw new controllerErrors.DatabaseInternalError(err);
    });
};

const updatePhone = (phoneId, phoneModel) => {
    validateModel(phoneModel);
    // console.log('ID', phoneId, 'MODEL', phoneModel);
    return PhoneModel.findByIdAndUpdate(phoneId, phoneModel, { new: true }).then((updatedPhone) => {
        return updatedPhone;
    }).catch(err => {
        throw new controllerErrors.DatabaseInternalError(err);
    });
}

module.exports.createPhone    = createPhone;
module.exports.getAllPhones   = getAllPhones;
module.exports.getPhoneById   = getPhoneById;
module.exports.getPhoneLength = getPhoneLength;
module.exports.deletePhone    = deletePhone;
module.exports.updatePhone    = updatePhone;