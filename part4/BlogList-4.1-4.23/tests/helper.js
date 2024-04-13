const BlogModel = require('./../src/models/Blog');
const UserModel = require('./../src/models/User');

const initialBlogs = [
    {
        'title': 'Titulo del blog',
        'author': 'Manuel Teves',
        'url': 'https://www.miblog.com/ManuelTeves/Como_hacer_milanesa.html',
        'likes': 3,
    },
    {
        'title': 'Titulo del blog 2',
        'author': 'Luz Arancibia',
        'url': 'https://www.miblog.com/ManuelTeves/Como_hacer_hamburgesa_casera.html',
        'likes': 1500,
        'id': '66101c80a259b69183618cf8'
    }
];
const initialUsers = [
    {
        'username': 'manuel_teves',
        'name': 'Manuel Teves',
        'passwordHash': 'abc123',
    },
];

const nonExistingId = async () => {
    const blog = new BlogModel({
        'title': 'Title',
        'author': 'Author',
        'url': 'FAKE_URL',
        'likes': 0,
    });
    await blog.save();
    await blog.deleteOne();

    return blog._id.toString();
};

const blogsInDb = async () => {
    const blogs = await BlogModel.find({});
    return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
    const users = await UserModel.find({});
    return users.map(user => user.toJSON());
};

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, initialUsers, usersInDb,
};