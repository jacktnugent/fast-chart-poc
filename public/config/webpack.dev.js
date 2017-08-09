'use strict';

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = function() {
    return webpackMerge(
                commonConfig(),
                {devtool: 'eval'});
};