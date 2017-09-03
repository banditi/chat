'use strict';

const glob = require('glob');
const Api = require('../lib/api');

const api = new Api();
glob.sync('./**/*.api.js', {cwd: __dirname}).forEach((filename) => {
    require(filename)(api);
});

module.exports = api;
