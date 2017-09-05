const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = require('./server/lib/env');

function resolve(name) {
    return path.resolve(__dirname, name);
}

const plugins = [
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(env)}),
    new ExtractTextPlugin('[name].css')
];

if (env === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        output: {comments: false},
        optimize: {warning: false}
    }));
}

const jsLoader = {
    loader: 'babel-loader',
    options: {
        presets: ['env', 'stage-2'],
        comments: true
    }
};

const cssLoader = ExtractTextPlugin.extract({
    use: {
        loader: 'css-loader',
        options: {
            minimize: env === 'production'
        }
    },
    fallback: 'vue-style-loader'
});

module.exports = {
    node: false,
    context: resolve('.'),
    entry: {
        index: './src/pages/index-page/index-page.js'
    },
    output: {
        path: resolve('build'),
        filename: '[name].js'
    },
    resolve: {
        modules: [resolve('src'), resolve('node_modules')],
        extensions: ['.js', '.vue']
    },
    externals: {
        vue: 'Vue'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: cssLoader,
                        postcss: cssLoader,
                        js: jsLoader
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: [resolve('src')],
                use: jsLoader
            }
        ]
    },
    plugins: plugins
};
