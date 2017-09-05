'use strict';

const chai = require('chai');
chai.should();

const assetsMiddleware = require('../../../server/middleware/assets');

describe('Assets middleware', () => {
    it('should be function', () => {
        assetsMiddleware.should.be.a('function');
    });
});
