# API

Все API должны находиться в папке `/server/api/` с именем вида `*.api.js`.

## Пример

```js
const joi = require('joi');

module.exports = (api) => {
    api
        .addRoute({
            path: '/update/name',
            validation: {
                query: {
                    name: joi.string().require()
                }
            },
            handler: (req) => {
                return provider.updateName(req.query.name)
                    .then(() => 'Success!');
            }
        })
        .addRoute({
            path: '/update/fullname',
            validation: {
                query: {
                    fullname: joi.string().require()
                }
            },
            handler: (req) => {
                return provider.updateFullname(req.query.fullname)
                    .then(() => 'Success!');
            }
        });
};
```
