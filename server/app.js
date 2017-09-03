'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const pingMiddleware = require('./middleware/ping');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error');
const api = require('./api');

const app = express();
const mainRouter = new express.Router();

mainRouter
    .get('/ping', pingMiddleware)
    .use(bodyParser.json())
    .use('/api', api.getRouter())
    .use(notFoundMiddleware)
    .use(errorMiddleware);

app.use(mainRouter);

module.exports = app;
