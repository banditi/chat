# Chat [![Build Status](https://travis-ci.org/banditi/chat.svg?branch=master)](https://travis-ci.org/banditi/chat) [![Coverage Status](https://coveralls.io/repos/github/banditi/chat/badge.svg?branch=master)](https://coveralls.io/github/banditi/chat?branch=master)

## Prerequisites

* node >=6

## Quick start

```sh
npm install
npm start
```

## Code quality

```sh
npm run validate
```

### Tests

```sh
npm test
```

Tests include coverage tool [istanbul](https://github.com/gotwarlost/istanbul). After test you can find results of coverage in `./coverage/lcov-report/index.html`. Use your browser to see it.

## Model
We are using [Sequelize](http://docs.sequelizejs.com/) as a tool for ORM. Dialect is PostgreSQL.


### Linters

For codestyle we are using [eslint](https://eslint.org).

```sh
npm run lint
```

### Precommit hook

Also we are using precommit hook [husky](https://github.com/typicode/husky).
