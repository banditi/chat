'use strict';

const express = require('express');
const env = require('../lib/env');

let webpack;
let webpackMiddleware;
let webpackConfig;
if (env !== 'production') {
    webpack = require('webpack');
    webpackMiddleware = require('webpack-dev-middleware');
    webpackConfig = require('../../webpack.config');
}

module.exports = webpack ?
    webpackMiddleware(webpack(webpackConfig), {
        lazy: true,
        stats: {
            colors: true
        }
    }) :
    express.static('build');
