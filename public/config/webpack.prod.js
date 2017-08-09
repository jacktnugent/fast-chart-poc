'use strict';
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = function() {
    return webpackMerge(
        commonConfig(),
        {
            devtool: 'source-map',
            plugins: [
                new webpack.optimize.AggressiveMergingPlugin(),

                new webpack.optimize.UglifyJsPlugin({
                    compress: {warnings: false},
                    sourceMap: true
                }),

                new webpack.optimize.CommonsChunkPlugin({
                    name: ['app', 'vendor']
                })
            ]
        });
};