const BlogModel = require('./../models/Blog');
const userController = require('./../controllers/User');

const safeBlogModel = (blogModel) => {
    return new BlogModel({
        title  : blogModel.title,
        author : blogModel.author,
        url    : blogModel.url,
        user   : blogModel.user,
        likes  : blogModel.likes || 0,
    });
};

const getAll = () => {
    return BlogModel.find({}).populate('users');
};

/**
 *
 * @param {BlogModel} blogModel
 */
const create = async (blogModel) => {
    // let user = await userController.getById(blogModel.userId);
    let user = await userController.getAny();
    console.log('USER', user);
    blogModel.user = user.id;
    let savedBlog = await (safeBlogModel(blogModel)).save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    return savedBlog;
};

/**
*
* @param {mongoose.Schema.Types.ObjectId} blogId
*/
const deleteById = (blogId) => {
    return BlogModel.findByIdAndDelete(blogId);
};

/**
*
* @param {mongoose.Schema.Types.ObjectId} blogId
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