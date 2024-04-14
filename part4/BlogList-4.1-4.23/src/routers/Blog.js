const blogController = require('./../controllers/Blog');
const blogRouter     = require('express').Router();
const jwt = require('jsonwebtoken');

const getTokenFrom = request => {
    //Get Token
    const authorization = request.get('authorization');
    //Verify
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '');
    }
    return null;
};

blogRouter.get('/', async (request, response) => {
    return response.status(200).json(await blogController.getAll());
});

blogRouter.post('/', async (request, response) => {
    //Verify and save JWT in request.body
    request.body.decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if (!request.body.decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' });
    }

    return response.status(201).json(await blogController.create(request.body));
});

blogRouter.delete('/:id', async (request, response) => {
    await blogController.deleteById(request.params.id);
    return response.sendStatus(204).end();
});

blogRouter.put('/:id', async (request, response) => {
    await blogController.update(request.params.id, request.body);
    response.sendStatus(200).end();
});

module.exports = blogRouter;