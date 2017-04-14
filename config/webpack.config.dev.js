import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    devtool: 'cheap-module-polyfill',
    entry: [
        'eventsource-polyfill', // necessary for hot reloading with IE
        'webpack-hot-middleware/client?reload=true',    // note that it reload the page it hot module reload
        'whatwg-fetch',
        './src/index'
    ],
    target: 'web',
    output: {
        path: path.resolve(__dirname + '../dist'),
        publicPath: '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './src'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),   // enable HMR globally
        new webpack.NamedModulesPlugin(),   // prints more readable module names in the browser console on HMR updates
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new ExtractTextPlugin('styles.css')
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: 'inline',
                        }
                    }
                ]
            }
        ]
    }
};