'use strict';

const path = require('path');
const extractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const root = path.resolve(__dirname, '..');

module.exports = function () {
    return {
        entry: {
            'app': './app/main',
            'styles': [
                './styles/styles.css'
            ],
            'vendor': './app/vendor'
        },

        output: {
            path: path.join(root, 'dist'),
            filename: '[name].bundle.js'
        },

        module: {
            rules:[
                {
                    test: /\.ts$/,
                    exclude: [/node_modules/, /bower_components/, /\.(spec|e2e)\.ts$/],
                    loader: 'ts-loader'
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader?minimize=false'
                },
      {
  test: /\.(jpg|png|svg)$/,
  loader: 'file-loader',
  options: {
    name: '[path][name].[hash].[ext]',
  },
},
                {
                    test: /(\.scss|\.css)$/,
                    exclude: [/node_modules/, /bower_components/],
                    use: extractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: false
                                    , url: false
                                }
                            },
                            {
                                loader: "postcss-loader",
                                options: {
                                    sourceMap: true,
                                    config: {
                                        path: path.join(root,'config/postcss.config.js')
                                    }
                                }
                            },
                            {
                                loader: "sass-loader",
                                options: {
                                    includePaths: [path.join(root, 'bower_components')]
                                }
                            }
                        ],
                        publicPath: './'
                    })
                }
            ]
        },

        plugins: [
            new webpack.ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                path.join(root, 'app')
            ),
            new extractTextPlugin({
                filename: "styles.bundle.css",
                allChunks: true
            })
        ],

        resolve: {
            extensions: ['.js', '.ts', '.css', '.scss']
        }
    };
}