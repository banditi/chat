'use strict';

const chai = require('chai');
chai.should();
const {EventEmitter} = require('events');
const httpMocks = require('node-mocks-http');
const indexPageMiddleware = require('../../../server/middleware/index-page');

describe('Index page middleware', () => {
    it('should send string', (done) => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse({
            eventEmitter: EventEmitter
        });

        res.on('end', () => {
            res.statusCode.should.be.equal(200);
            res._getData().should.be.a('string');
            done();
        });

        indexPageMiddleware(req, res);
    });
});
