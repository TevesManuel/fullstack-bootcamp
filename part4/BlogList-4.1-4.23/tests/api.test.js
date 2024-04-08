const mongoose  = require('mongoose');
const supertest = require('supertest');
const app       = require('./../src/app');
const BlogModel = require('./../src/models/Blog');
const blogController = require('./../src/controllers/Blog');
const helper    = require('./helper');
const api       = supertest(app);

beforeEach(async () => {
    await BlogModel.deleteMany({});

    for (let blog of helper.initialBlogs)
    {
        let blogObject = new BlogModel(blog);
        await blogObject.save();
    }
});

describe('GET Blog API', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('blogs are returned with id and without _id', async () => {
        let blogs = await helper.blogsInDb();
        for(let blog of blogs)
        {
            expect(blog.id).toBeDefined();
        }
    });

});

describe('POST Blog API', () => {

    test('Cheking of the creation of an user', async () => {
        let new_blog_request = new BlogModel({
            'title': 'NewBlog',
            'author': 'AuthorOfBlog',
            'url': 'BLOG_URL',
            'likes': 5,
        });
        let countOfBlogs = (await helper.blogsInDb()).length;
        let new_blog_response = await blogController.create(new_blog_request);
        expect((await helper.blogsInDb()).length).toBeGreaterThan(countOfBlogs);
        new_blog_response.__v = undefined;
        new_blog_response._id = '';
        new_blog_request._id  = '';
        console.log('req', new_blog_response);
        console.log('req', new_blog_request);
        expect(new_blog_response).toContainEqual(new_blog_request);
    });

});

afterAll(() => {
    mongoose.connection.close();
});