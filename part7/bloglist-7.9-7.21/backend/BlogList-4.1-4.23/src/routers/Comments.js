const commentController = require('./../controllers/Comment');
const commentsRouter     = require('express').Router();

commentsRouter.post('/', async (request, response) => {
    if ( request.body.password.length < 3 )
        response.status(400).json({ error: 'Error username needs at least 3 characters' });
    const saltRounds = require('./../utils/config').saltRoundsHash;
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds);

    response.status(201).json(await userController.create({
        username: request.body.username,
        name: request.body.name,
        passwordHash,
    }));
});

commentsRouter.get('/', async (request, response) => {
    const users = await userController.getAll();
    response.json(users);
});

module.exports = commentsRouter;