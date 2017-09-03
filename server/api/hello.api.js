'use strict';

const joi = require('joi');

module.exports = (api) => {
    api.addRoute({
        path: '/hello',
        validation: {
            query: {
                name: joi.string().required()
            }
        },
        handler: (req) => Promise.resolve(`Hello, ${req.query.name}!`)
    });
};
