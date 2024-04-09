const mongoose  = require('mongoose');
const supertest = require('supertest');
const app       = require('./../src/app');
const BlogModel = require('./../src/models/Blog');
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
        console.log("asd", blogs);
        for(let blog of blogs)
        {
            expect(blog._id).toBeDefined();
        }
    });

});

afterAll(() => {
    mongoose.connection.close();
});