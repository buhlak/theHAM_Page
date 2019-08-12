'use strict';

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        'index.js': [
            './src/js/import.js',
            './src/js/services-about_tab.js',
            './src/js/services-about_height-setter.js',
            './src/js/gallery_load-sort-img.js',
            './src/js/toggle-menu.js',
            './src/js/search-button.js',
            './src/js/slider.js',
            './src/js/modal-window.js'
        ],
    },
    output: {
        filename: './js/index.js',
        path: __dirname + '/dist'
    },
    watch: true,
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,

                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'img/[hash].[ext]'
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style/[name].css",
        }),
        new CopyPlugin([
            { from: './src/img', to: './img' },
            { from: './src/style/reset.css', to: './style' },
            { from: './src/gallery-data.json', to: './' },
            { from: './src/slider-data.json', to: './' },
        ]),
    ],
};