module.exports = {
    extends: 'loris/es6',
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true
        },
        sourceType: 'module'
    },
    rules: {
        camelcase: ['error', {properties: 'never'}]
    }
};
