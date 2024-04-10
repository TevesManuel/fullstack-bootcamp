const blogController = require('./../controllers/Blog');
const blogRouter     = require('express').Router();

blogRouter.get('/', async (request, response) => {
    return response.status(200).json(await blogController.getAll());
});

blogRouter.post('/', async (request, response) => {
    return response.status(201).json(await blogController.create(request.body));
});

blogRouter.delete('/:id', async (request, response) => {
    console.log("DELETE ENTERED");
    console.log("THE ID", request.params.id);
    blogController.deleteById(request.params.id);
    return response.status(204);
});

module.exports = blogRouter;