import webpack from 'webpack';
import path from 'path';
import postcss from 'postcss';

export default {
    devtool: 'cheap-module-polyfill',
    entry: [
        'webpack-hot-middleware/client',
        'whatwg-fetch',
        './src/index'
    ],
    target: 'web',
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './app'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),   // enable HMR globally
        new webpack.NamedModulesPlugin(),   // prints more readable module names in the browser console on HMR updates
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(scss)$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }   
};