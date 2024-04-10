const mongoose  = require('mongoose');
const supertest = require('supertest');
const app       = require('./../src/app');
const helper    = require('./helper');
const api       = supertest(app);
const BlogModel = require('./../src/models/Blog');

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
        let new_blog_request = {
            'title': 'NewBlog',
            'author': 'AuthorOfBlog',
            'url': 'BLOG_URL',
            'likes': 5,
        };
        let countOfBlogs = (await helper.blogsInDb()).length;
        let new_blog_response = (await api.post('/api/blogs/').send(new_blog_request)).body;
        console.log("RES", new_blog_response);
        expect((await helper.blogsInDb()).length).toBeGreaterThan(countOfBlogs);
        expect(new_blog_response.title).toEqual(new_blog_request.title);
        expect(new_blog_response.author).toEqual(new_blog_request.author);
        expect(new_blog_response.url).toEqual(new_blog_request.url);
        expect(new_blog_response.likes).toEqual(new_blog_request.likes);
        //NOT WORK
        // new_blog_response.__v = undefined;
        // new_blog_request.__v = undefined;
        // new_blog_response._id = '';
        // new_blog_request._id  = '';
        // console.log('res', new_blog_response);
        // console.log('req', new_blog_request);
        // expect(new_blog_response).toEqual(new_blog_request);
    });
    test('Cheking creating user without likes', async () => {
        let new_blog_request = {
            'title': 'NewBlog',
            'author': 'AuthorOfBlog',
            'url': 'BLOG_URL',
        };
        let countOfBlogs = (await helper.blogsInDb()).length;
        let new_blog_response = (await api.post('/api/blogs/').send(new_blog_request)).body;
        expect((await helper.blogsInDb()).length).toBeGreaterThan(countOfBlogs);
        expect(new_blog_response.title).toEqual(new_blog_request.title);
        expect(new_blog_response.author).toEqual(new_blog_request.author);
        expect(new_blog_response.url).toEqual(new_blog_request.url);
        expect(new_blog_response.likes).toEqual(0);
    });
    test('Cheking 400 STATE because title missing', async () => {
        let new_blog_request = {
            'author': 'AuthorOfBlog',
            'url': 'BLOG_URL',
        };
        await api.post('/api/blogs').send(new_blog_request).expect(400);
    });
    test('Cheking 400 STATE because url missing', async () => {
        let new_blog_request = {
            'title': 'NewBlog',
            'author': 'AuthorOfBlog',
        };
        await api.post('/api/blogs').send(new_blog_request).expect(400);
    });

});

describe('DELETE Blog API', () => {

    test('Simple delete case', async () => {
        let initialNotesLenght = (await helper.blogsInDb()).length;
        let new_blog_request = {
            'title': 'NewBlog',
            'author': 'AuthorOfBlog',
            'url': 'BLOG_URL',
        };
        let new_blog_response = (await api.post('/api/blogs/').send(new_blog_request)).body;
        // expect((await helper.blogsInDb()).lenght).toBeGreaterThan(initialNotesLenght);
        console.log("REQURL", `/api/blogs/?id=${new_blog_response.id}`);
        await api.delete(`/api/blogs/?id=${new_blog_response.id}`).expect(204);
        // expect((await helper.blogsInDb()).length).toEqual(initialNotesLenght);
    });

});

afterAll(() => {
    mongoose.connection.close();
});