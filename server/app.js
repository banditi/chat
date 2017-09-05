'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const pingMiddleware = require('./middleware/ping');
const assetsMiddleware = require('./middleware/assets');
const indexPageMiddleware = require('./middleware/index-page');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error');
const api = require('./api');

const app = express();
const mainRouter = new express.Router();

mainRouter
    .get('/ping', pingMiddleware)
    .use('/build', assetsMiddleware)
    .use(bodyParser.json())
    .use('/api', api.getRouter())
    .get('/*', indexPageMiddleware)
    .use(notFoundMiddleware)
    .use(errorMiddleware);

app
    .use(mainRouter);

module.exports = app;
