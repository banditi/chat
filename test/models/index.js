const expect = require('chai').expect;

const models = require('../../models');
//TODO replace library for tests
describe('Check models/index', () => {
    it('Check User entity', () => {
        expect(models.User).to.not.equal(undefined);
    });

    it('Check Message entity', () => {
        expect(models.Message).to.not.equal(undefined);
    });

    it('Check Channel entity', () => {
        expect(models.Channel).to.not.equal(undefined);
    });
});
