const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/
/** @type WebpackConfig */

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.tsx',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /[\.ts|\.tsx|\.jsx|\.js]$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-typescript',
                                '@babel/preset-react',
                            ],
                            plugins: [
                                '@babel/transform-runtime',
                                '@babel/plugin-proposal-object-rest-spread',
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.wasm$/i,
                use: ['wasm-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    externals: {
        graphvizLib: '@hpcc-js/wasm',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'res/index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'node_modules/@hpcc-js/wasm/dist/graphvizlib.wasm',
                    to: 'graphvizlib.wasm',
                },
            ],
        }),
        new CleanWebpackPlugin(),
    ],
};
