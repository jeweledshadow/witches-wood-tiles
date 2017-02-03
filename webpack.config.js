'use strict';

const path = require('path');

const WebpackConfig = {
    entry: "./src/main.js",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js"
    },

    devtool: 'cheap-module-eval-source-map',

    devServer: {
        inline: true
    }
};

module.exports = WebpackConfig;
