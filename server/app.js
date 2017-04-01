const express = require('express');

const pingMiddleware = require('./middleware/ping');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error');

const app = express();
const mainRouter = new express.Router();

mainRouter
    .get('/ping', pingMiddleware)
    .use(notFoundMiddleware)
    .use(errorMiddleware);

app.use(mainRouter);

module.exports = app;
