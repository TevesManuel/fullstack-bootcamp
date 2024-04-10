const BlogModel = require('./../models/Blog');

const getAll = () => {
    return BlogModel.find({});
};

/**
 *
 * @param {BlogModel} blogModel
 */
const create = (blogModel) => {
    // return (new BlogModel(blogModel)).save();
    return (new BlogModel({
        title  : blogModel.title,
        author : blogModel.author,
        url    : blogModel.url,
        likes  : blogModel.likes || 0,
    })).save();
};

/**
*
* @param {Number} blogId
*/
const deleteById = (blogId) => {
   return BlogModel.findOneAndDelete(blogId);
};

module.exports.getAll     = getAll;
module.exports.create     = create;
module.exports.deleteById = deleteById;