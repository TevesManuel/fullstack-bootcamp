const mongoose  = require('mongoose');
const supertest = require('supertest');
const app       = require('./../src/app');
const helper    = require('./helper');
const api       = supertest(app);
const BlogModel = require('./../src/models/Blog');
const UserModel = require('./../src/models/User');

beforeEach(async () => {
    await BlogModel.deleteMany({});
    await UserModel.deleteMany({});

    for (let blog of helper.initialBlogs)
    {
        let blogObject = new BlogModel(blog);
        await blogObject.save();
    }
    for (let user of helper.initialUsers)
    {
        user.passwordHash = await helper.encrypt_pass(user.password);
        let userObject = new UserModel(user);
        await userObject.save();
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

    test('Cheking of the creation of an blog', async () => {

        let new_blog_request = {
            'title': 'NewBlog',
            'author': 'AuthorOfBlog',
            'url': 'BLOG_URL',
            'likes': 5,
        };
        let token = ((await api.post('/api/login').send(helper.initialUsers[0])).body.token);
        // console.log('TOKEN', token);
        let countOfBlogs = (await helper.blogsInDb()).length;

        let new_blog_response = (await api.post('/api/blogs/')
            .set('Authorization', `Bearer ${token}`)
            .send(new_blog_request)).body;

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
    test('Cheking creating blog without likes', async () => {
        let new_blog_request = {
            'title': 'NewBlog',
            'author': 'AuthorOfBlog',
            'url': 'BLOG_URL',
        };
        let countOfBlogs = (await helper.blogsInDb()).length;

        let token = ((await api.post('/api/login').send(helper.initialUsers[0])).body.token);

        let new_blog_response = (await api.post('/api/blogs/')
            .set('Authorization', `Bearer ${token}`)
            .send(new_blog_request)).body;

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

        let token = ((await api.post('/api/login').send(helper.initialUsers[0])).body.token);

        await api.post('/api/blogs/')
            .set('Authorization', `Bearer ${token}`)
            .send(new_blog_request).expect(400);
    });
    test('Cheking 400 STATE because url missing', async () => {
        let new_blog_request = {
            'title': 'NewBlog',
            'author': 'AuthorOfBlog',
        };

        let token = ((await api.post('/api/login').send(helper.initialUsers[0])).body.token);

        await api.post('/api/blogs/')
            .set('Authorization', `Bearer ${token}`)
            .send(new_blog_request).expect(400);
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

        let token = ((await api.post('/api/login').send(helper.initialUsers[0])).body.token);

        let new_blog_response = (await api.post('/api/blogs/')
            .set('Authorization', `Bearer ${token}`)
            .send(new_blog_request)).body;

        expect((await helper.blogsInDb()).length).toBeGreaterThan(initialNotesLenght);
        await api.delete(`/api/blogs/${new_blog_response.id}`).expect(204);
        expect((await helper.blogsInDb()).length).toEqual(initialNotesLenght);
    });

    test('Delete not existent blog case', async () => {
        await api.delete(`/api/blogs/${await helper.nonExistingId()}`).expect(204);
    });

});

describe('PUT Blog API', () => {

    test('Simple put case', async () => {
        let new_blog_request = {
            'title': 'NewBlog',
            'author': 'AuthorOfBlog',
            'url': 'BLOG_URL',
        };

        let token = ((await api.post('/api/login').send(helper.initialUsers[0])).body.token);

        let new_blog_response = (await api.post('/api/blogs/')
            .set('Authorization', `Bearer ${token}`)
            .send(new_blog_request)).body;

        await api.put(`/api/blogs/${new_blog_response.id}`)
            .send({
                'title': 'NewBlogModified'
            }).expect(200);
    });

});

describe('POST Users API', () => {

    test('Simple post case', async () => {
        let new_user_request = {
            'username': 'test_manuel_teves',
            'name': 'Manuel Teves',
            'password': 'abc123',
        };
        await api.post('/api/users').send(new_user_request).expect(201);
    });

    test('Short username post case', async () => {
        let new_user_request = {
            'username': 'mt',
            'name': 'Manuel Teves',
            'password': 'abc123',
        };
        await api.post('/api/users').send(new_user_request).expect(400);
    });

    test('Short password post case', async () => {
        let new_user_request = {
            'username': 'test_manuel_teves2',
            'name': 'Manuel Teves',
            'password': 'ab',
        };
        await api.post('/api/users').send(new_user_request).expect(400);
    });

});

afterAll(() => {
    mongoose.connection.close();
});