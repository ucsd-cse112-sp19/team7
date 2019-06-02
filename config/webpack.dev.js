const merge = require('webpack-merge');
const common = require('./webpack.common');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        contentBase: './dist'
    },
    mode: "development",
    plugins: [
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            { 
                test: /\.js$/,
                exclude: [ 
                    /node_modules/,
                    /tests/,
                    /vendor/,
                ],
                loader: 'istanbul-instrumenter-loader',    
                query: {
                    esModules: true
                }
            }
        ],
    }
});