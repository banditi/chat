module.exports = {
    extends: [
        'loris/es6',
        'plugin:vue/recommended'
    ],
    root: true,
    env: {
        node: true,
        es6: true
    },
    plugins: ['vue'],
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true
        },
        sourceType: 'module'
    },
    rules: {
        camelcase: ['error', {properties: 'never'}],

        // Stylistic Issues.
        'vue/attribute-hyphenation': ['error', 'never'],
        'vue/html-quotes': ['error', 'double'],
        'vue/html-self-closing': 'error',
        'vue/max-attributes-per-line': ['error', {
            singleline: 3,
            multiline: {
                max: 1,
                allowFirstLine: false
            }
        }],
        'vue/mustache-interpolation-spacing': ['error', 'never'],
        'vue/name-property-casing': ['error', 'PascalCase'],
        'vue/no-multi-spaces': 'error',
        'vue/v-bind-style': ['error', 'shorthand'],
        'vue/v-on-style': ['error', 'shorthand']
    },
    overrides: [{
        files: [
            'server/**/**.js',
            'test/**/**.js',
            'hooks/**/**.js'
        ],
        parserOptions: {
            sourceType: 'script'
        }
    }, {
        files: 'test/**/**.js',
        env: {
            mocha: true
        }
    }]
};
