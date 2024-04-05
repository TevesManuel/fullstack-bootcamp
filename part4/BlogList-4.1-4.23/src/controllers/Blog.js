const BlogModel = require('./../models/Blog');

const getAll = () => {
    return BlogModel.find({});
};

/**
 *
 * @param {BlogModel} blogModel
 */
const create = (blogModel) => {
    return (new BlogModel(blogModel)).save();
};

module.exports.getAll = getAll;
module.exports.create = create;