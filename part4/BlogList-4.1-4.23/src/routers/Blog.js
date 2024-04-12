const blogController = require('./../controllers/Blog');
const blogRouter     = require('express').Router();

blogRouter.get('/', async (request, response) => {
    return response.status(200).json(await blogController.getAll());
});

blogRouter.post('/', async (request, response) => {
    return response.status(201).json(await blogController.create(request.body));
});

blogRouter.delete('/:id', async (request, response) => {
    await blogController.deleteById(request.params.id);
    return response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
    await blogController.update(request.params.id, request.body);
    response.send(200).end();
});

module.exports = blogRouter;