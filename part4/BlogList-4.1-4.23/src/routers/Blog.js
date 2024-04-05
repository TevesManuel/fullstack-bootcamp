const blogController = require('./../controllers/Blog');
const blogRouter     = require('express').Router();

blogRouter.get('/', (request, response) => {
    blogController.getAll().then(blogs => response.json(blogs));
});

blogRouter.post('/', (request, response) => {
    blogController.create(request.body).then(blog => response.status(201).json(blog));
});

module.exports = blogRouter;