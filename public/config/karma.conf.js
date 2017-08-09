const webpack = require('webpack');

module.exports = function (config) {
    var testWebpackConfig = require('./webpack.test.js');

    var configuration = {
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'source-map-support'],


        // list of files / patterns to load in the browser
        files: [
            { pattern: './config/spec-bundle.js', watched: false },
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'coverage-istanbul', 'karma-remap-istanbul'],

        coverageIstanbulReporter: {

            // reports can be any that are listed here: https://github.com/istanbuljs/istanbul-reports/tree/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib
            reports: ['lcovonly','text-summary'],

            // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
            dir: '.',

            // if using webpack and pre-loaders, work around webpack breaking the source path
            fixWebpackSourcePaths: true,

            // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
            skipFilesWithNoCoverage: true
        },

        remapIstanbulReporter: {
            reports: {
                html: 'coverage'
            }
        },

        webpack: testWebpackConfig,

        webpackMiddleware: {
            noInfo: true, //please don't spam the console when running in karma!
            stats: {
                // options i.e.
                chunks: false
            }
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        // autoWatch: ENV_PRODUCTION ? false : true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS']
        /*
         * Continuous Integration mode
         * if true, Karma captures browsers, runs the tests and exits
         */
        // singleRun: true
    };

    config.set(configuration);
};