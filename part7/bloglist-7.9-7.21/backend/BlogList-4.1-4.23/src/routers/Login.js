const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const userController = require('./../controllers/User');

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body;

    const user = await userController.getBy({ username });
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        });
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    };

    const token = jwt.sign(userForToken, require('./../utils/config').SECRET);

    response
        .status(200)
        .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;