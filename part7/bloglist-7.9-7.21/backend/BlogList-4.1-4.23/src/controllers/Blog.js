const BlogModel = require("./../models/Blog");
const userController = require("./../controllers/User");

const safeBlogModel = (blogModel) => {
  return new BlogModel({
    title: blogModel.title,
    author: blogModel.author,
    url: blogModel.url,
    user: blogModel.user,
    likes: blogModel.likes || 0,
  });
};

/**
 *
 * @param {mongoose.Schema.Types.ObjectId} blogId
 * @returns {BlogModel}
 */
const getById = async (blogId) => {
  return await BlogModel.findById(blogId);
};

/**
 *
 * @returns {BlogModel}
 */
const getAll = async () => {
  //(MODEL).populate(KEY_TO_POPULATE)
  return await BlogModel.find({}).populate("user");
};

/**
 *
 * @param {BlogModel} blogModel
 */
const create = async (blogModel) => {
  //Get id from JWT
  let user = await userController.getById(blogModel.decodedToken.id);
  blogModel.user = user.id;
  let savedBlog = await safeBlogModel(blogModel).save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  return savedBlog;
};

/**
 *
 */
const comment = async (requestBody) => {
  //Get id from JWT
  let user = await userController.getById(requestBody.decodedToken.id);
  console.log(
    `${user.username} with the ID ${user.id} make the comment \"${requestBody.text}\"`
  );
  let savedBlog = await BlogModel.findById(requestBody.id);
  savedBlog.comments.push({ text: requestBody.text, author: user.id });
  console.log(savedBlog.comments);
  savedBlog.save();
  return savedBlog;
};

const belongTo = async (blogId, userId) => {
  const blog = await getById(blogId);
  if (blog) {
    return blog.user.toString() === userId.toString();
  } else {
    return true;
  }
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

module.exports.getById = getById;
module.exports.getAll = getAll;
module.exports.create = create;
module.exports.deleteById = deleteById;
module.exports.update = update;
module.exports.belongTo = belongTo;
module.exports.comment = comment;
