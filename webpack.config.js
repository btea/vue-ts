var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var webpackBar  = require('webpackbar');
var proxy = require('http-proxy-middleware');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    performance: {
        hints: "warning", // 枚举
        maxAssetSize: 30000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
        assetFilter: function(assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.js');
        
        }
    },
    entry: {
        app: './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','postcss-loader','less-loader']
            },
            {
                test: /.html$/,
                use: {
                    loader: 'html-loader',
                    options: {minimize: true}
                }
            },
            {
                test: /\.(gif|jpg|jpeg|png)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[hash:8].[ext]'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[hash:8].[ext]'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        ts: 'ts-loader',
                        tsx: 'babel-loader!ts-loader'
                    }
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            { 
                test: /\.tsx$/, 
                loader: 'babel-loader!ts-loader', 
                options: { appendTsxSuffixTo: [/TSX\.vue$/] } 
            }
        ]
    },
    resolve: {
        extensions: ['.js','.ts','.json','.vue','.css','.less'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
        }),
        new VueLoaderPlugin(),
        new webpackBar(),
        new ExtractTextPlugin('css/[name].[hash:8].css'),
        new CleanWebpackPlugin()
    ],
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.1.125:3000/',
                changeOrigin: true,
                pathRewrite: { "^/api":"/" }
            }
        }
    }
}