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
        }),
        new HtmlWebpackPlugin({
            title: 'Chenliuyan Test',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
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
                                importLoaders: 1,
                                modules: true
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
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.(ttf|eot)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    }   
};