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
    return await UserModel.findOne({ userId });
};

/**
*
* @returns {UserModel}
*/
const getAny = async () => {
    return await UserModel.findOne({ });
};

/**
 * @param {Object} userModel
 * @returns {UserModel}
 */
const create = (userModel) => {
    let safeModel = safeUserModel(userModel);
    console.log('asd');
    return safeModel.save();
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
module.exports.create  = create;
module.exports.update  = update;