const log = require('debug')('chat:app');

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    log('Listening on %s', port);
});
