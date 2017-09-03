'use strict';

const chai = require('chai');
chai.should();
const httpMocks = require('node-mocks-http');
const notFoundMiddleware = require('../../../server/middleware/not-found');

describe('Not found middleware', () => {
    it('should send 404 status', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        notFoundMiddleware(req, res);

        res.statusCode.should.equal(404);
    });
});
