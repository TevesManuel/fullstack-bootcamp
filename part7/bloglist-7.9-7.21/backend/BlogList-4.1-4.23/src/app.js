const express = require('express');
const app = express();
require('express-async-errors');
const cors = require('cors');
const db = require('./utils/db');
const middleware = require('./utils/middleware');
const blogRouter = require('./routers/Blog');
const userRouter = require('./routers/Users');
const loginRouter = require('./routers/Login');
const commentsRouter = require('./routers/Comments');

db.setup_db();

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);
app.use(middleware.requestLogger);
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/comments', commentsRouter);
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./routers/Tests');
    app.use('/api/testing', testingRouter);
}
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;