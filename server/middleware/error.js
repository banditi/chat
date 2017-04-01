const debug = require('debug')('chat:error-middleware');

// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
    debug(error.stack);
    res.sendStatus(500);
};
