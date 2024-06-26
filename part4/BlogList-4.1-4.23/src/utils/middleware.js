const logger = require('./logger');
const jwt = require('jsonwebtoken');

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method);
    logger.info('Path:  ', request.path);
    logger.info('Has token:  ', !!request.token);
    logger.info('Body:  ', request.body);
    logger.info('---');
    next();
};

const tokenExtractor = (request, response, next) => {
    //Get Authorization header
    const authorization = request.get('authorization');
    //Verifing struct of the token
    if (authorization && authorization.startsWith('Bearer '))
    {
        //Geting token
        request.token = authorization.replace('Bearer ', '');
    }

    if(request.token)
    {
        //Verify & save
        request.body.decodedToken = jwt.verify(request.token, process.env.SECRET);
        if (!request.body.decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' });
        }
    }

    next();
};

const userExtractor = (request, response, next) => {
    if(request.body.decodedToken)
        request.user = request.body.decodedToken.username;
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError')
    {
        return response.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError')
    {
        return response.status(400).json({ error: error.message });
    }
    else if (
        error.name === 'MongoServerError'
        && error.message.includes('E11000 duplicate key error')
    )
    {
        return response.status(400).json({ error: 'expected `username` to be unique' });
    }
    else if (error.name ===  'JsonWebTokenError')
    {
        return response.status(401).json({ error: 'token invalid' });
    }

    next(error);
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
};