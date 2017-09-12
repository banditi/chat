require('chai').should();
const {User} = require('../../models');

describe('User model', () => {
    afterEach(() => {
        // drop table;
    });

    it('Test user entity creation', (done) => {
        User.sync({force: true})
            .then(() => User.create({
                email: 'a@a.a',
                token: 'token'
            }))
            .then((user) => {
                user.email.should.be.equal('a@a.a');
                done();
            });
    });
});
