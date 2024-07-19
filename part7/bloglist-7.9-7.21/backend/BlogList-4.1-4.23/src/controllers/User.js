const UserModel = require('./../models/User');

/**
 *
 * @param {Object} userModel
 */
const safeUserModel = (userModel) => {
    return new UserModel(userModel);
};

/**
 *
 * @param {mongoose.Schema.Types.ObjectId} userId
 * @returns {UserModel}
 */
const getById = async (userId) => {
    return await UserModel.findById(userId);
};

/**
*
* @param {Object} params
* @returns {UserModel}
*/
const getBy = async (params) => {
    return await UserModel.findOne(params);
};

/**
*
* @returns {UserModel}
*/
const getAny = async () => {
    return await UserModel.findOne({ });
};

/**
*
* @returns {UserModel}
*/
const getAll = async () => {
    return await UserModel.find({ }).populate('blogs');
};

/**
 * @param {Object} userModel
 * @returns {UserModel}
 */
const create = (userModel) => {
    return safeUserModel(userModel).save();
};

/**
*
* @param {mongoose.Schema.Types.ObjectId} userId
* @param {UserModel} userModel
*
*/
const update = (userId, userModel) => {
    return UserModel.findByIdAndUpdate(userId, userModel, { new: true });
};

module.exports.getById = getById;
module.exports.getAny  = getAny;
module.exports.getBy   = getBy;
module.exports.getAll  = getAll;
module.exports.create  = create;
module.exports.update  = update;