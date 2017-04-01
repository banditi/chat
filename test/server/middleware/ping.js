const chai = require('chai');
chai.should();
const httpMocks = require('node-mocks-http');
const pingMiddleware = require('../../../server/middleware/ping');

describe('Ping middleware', () => {
    it('should send 200 status', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        pingMiddleware(req, res);

        res.statusCode.should.equal(200);
    });
});
