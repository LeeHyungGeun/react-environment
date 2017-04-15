import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
    devtool: 'source-map',
    entry: {
        index: [
            'whatwg-fetch',
            './src/index'
        ]
    },
    target: 'web',
    output: {
        path: path.join(__dirname, '../dist'),   // Note: Physical files are only output by the production build
        publicPath: '/dist',
        filename: '[name].js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            title: 'index',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            hash: true,
            chunk: ['index'],
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: 'inline'
                            }
                        }
                    ]
                })
            }
        ]
    }   
};