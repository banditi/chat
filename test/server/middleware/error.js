'use strict';

const chai = require('chai');
chai.should();
const httpMocks = require('node-mocks-http');
const errorMiddleware = require('../../../server/middleware/error');

describe('Error middleware', () => {
    it('should send 500 status', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        errorMiddleware(new Error('error'), req, res);

        res.statusCode.should.equal(500);
    });
});
