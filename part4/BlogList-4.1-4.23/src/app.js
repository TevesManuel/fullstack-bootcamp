const express = require('express');
const app = express();
require('express-async-errors');
const cors = require('cors');
const db = require('./utils/db');
const middleware = require('./utils/middleware');
const blogRouter = require('./routers/Blog');
const userRouter = require('./routers/Users');

db.setup_db();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;