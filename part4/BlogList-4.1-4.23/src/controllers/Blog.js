const BlogModel = require('./../models/Blog');

const safeBlogModel = (blogModel) => {
    return new BlogModel({
        title  : blogModel.title,
        author : blogModel.author,
        url    : blogModel.url,
        likes  : blogModel.likes || 0,
    });
};

const getAll = () => {
    return BlogModel.find({});
};

/**
 *
 * @param {BlogModel} blogModel
 */
const create = (blogModel) => {
    return safeBlogModel(blogModel).save();
};

/**
*
* @param {Number} blogId
*/
const deleteById = (blogId) => {
    return BlogModel.findByIdAndDelete(blogId);
};

/**
*
* @param {Number} blogId
* @param {BlogModel} blogModel
*
*/
const update = (blogId, blogModel) => {
    return BlogModel.findByIdAndUpdate(blogId, blogModel, { new: true });
};

module.exports.getAll     = getAll;
module.exports.create     = create;
module.exports.deleteById = deleteById;
module.exports.update     = update;