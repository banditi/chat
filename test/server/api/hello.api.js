'use strict';

require('chai').should();

const express = require('express');
const bodyParser = require('body-parser');
const request = require('supertest');

const Api = require('../../../server/lib/api');
const helloApi = require('../../../server/api/hello.api');

const checkResponse = (res, expectBody) => {
    res.statusCode.should.be.equal(200);
    res.headers['content-type'].should.be.match(/json/);
    res.body.should.be.deep.equal(expectBody);
};

const api = new Api();
helloApi(api);

const app = express()
    .use(bodyParser.json())
    .use(api.getRouter());

describe('Hello api', () => {
    it('should response as hello api', () => {
        const name = 'vasya';
        return request(app)
            .get('/hello')
            .query({name})
            .then((res) => {
                checkResponse(res, {data: `Hello, ${name}!`});
            });
    });

    it('should validate query parameter `name`', () => {
        return request(app)
            .get('/hello')
            .then((res) => {
                checkResponse(res, {error: {
                    code: 400,
                    message: '"name" is required'
                }});
            });
    });
});
