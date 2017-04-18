const fs = require('fs');
const log = require('debug')('hook:commit-msg');

const message = fs.readFileSync(process.env.GIT_PARAMS).toString();

if (/^(TRIVIAL|#[0-9]+): /.test(message)) {
    process.exit(0);
}

log('Abort commit, specify commit message as "#{issue}: message" or "TRIVIAL: message"');
process.exit(1);
