const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./utils/db');
const middleware = require('./utils/middleware');
const blogRouter = require('./routers/Blog');

db.setup_db();
process.on('exit', () => db.turn_off());

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;