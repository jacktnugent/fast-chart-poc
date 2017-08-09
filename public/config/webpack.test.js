'use strict';

const path = require('path');
const webpack = require('webpack');
const root = path.resolve(__dirname, '..');

module.exports = {
    /**
     * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
     *
     * Do not change, leave as is or it wont work.
     * See: https://github.com/webpack/karma-webpack#source-maps
     */
    devtool: 'inline-source-map',

    /**
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {

        /**
         * An array of extensions that should be used to resolve modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
         */
        extensions: ['.ts', '.js'],

        /**
         * Make sure root is src
         */
        modules: [path.join(root, 'app'), 'node_modules']

    },

    module: {
        rules: [
            /**
             * Source map loader support for *.js files
             * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
             *
             * See: https://github.com/webpack/source-map-loader
             */
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    // these packages have problems with their sourcemaps
                    path.join(root, 'node_modules/rxjs'),
                    path.join(root, 'node_modules/@angular')
                ]
            },

            {
                test: /\.ts$/,
                exclude: [/node_modules/,/\.e2e\.ts$/],
                loader: 'ts-loader',
                query: {
                    // use inline sourcemaps for "karma-remap-coverage" reporter
                    sourceMap: false,
                    inlineSourceMap: true,
                    compilerOptions: {

                        // Remove TypeScript helpers to be injected
                        // below by DefinePlugin
                        removeComments: true

                    }
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader?minimize=false',
                exclude: [path.join(root, 'src/index.html')]
            },
            /**
             * Instruments JS files with Istanbul for subsequent code coverage reporting.
             * Instrument only testing sources.
             *
             * See: https://github.com/deepsweet/istanbul-instrumenter-loader
             */
            {
                enforce: 'post',
                test: /\.(js|ts)$/,
                loader: 'istanbul-instrumenter-loader',
                include: path.join(root, 'app'),
                exclude: [
                    /\.(e2e|spec)\.ts$/,
                    /node_modules/
                ]
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.join(root, 'app')
        )
    ],

    /**
     * Disable performance hints
     *
     * See: https://github.com/a-tarasyuk/rr-boilerplate/blob/master/webpack/dev.config.babel.js#L41
     */
    performance: {
        hints: false
    }
};