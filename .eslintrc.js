module.exports = {
    extends: 'loris/es6',
    root: true,
    env: {
        node: true,
        es6: true
    },
    rules: {
        camelcase: ['error', {properties: 'never'}]
    },
    overrides: [{
        files: 'client/**',
        parserOptions: {
            ecmaVersion: 6,
            ecmaFeatures: {
                jsx: true
            },
            sourceType: 'module'
        }
    }, {
        files: 'test/**',
        env: {
            mocha: true
        }
    }]
};
