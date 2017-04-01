const chai = require('chai');
chai.should();
const request = require('supertest');

const app = require('../../server/app');

describe('App on /ping', () => {
    it('should be responded as 200 for get', (done) => {
        request(app)
            .get('/ping')
            .expect(200, done);
    });

    it('should be responded as 404 for post', (done) => {
        request(app)
            .post('/ping')
            .expect(404, done);
    });
});
