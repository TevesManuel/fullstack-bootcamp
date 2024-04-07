const blogController = require('./../controllers/Blog');
const blogRouter     = require('express').Router();

blogRouter.get('/', async (request, response) => {
    return response.status(200).json(await blogController.getAll());
});

blogRouter.post('/', async (request, response) => {
    return response.status(201).json(await blogController.create(request.body));
});

module.exports = blogRouter;