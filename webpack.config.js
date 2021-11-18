const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js',
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
        static: path.join(__dirname, 'static'),
        historyApiFallback: true //在使用browerHistory的时候，刷新会报404，自动重定向到index.html
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '~': path.resolve(__dirname, 'node_modules')
        },
        extensions: ['.ts', '.tsx', '.js', '.json'] //当加载一个文件的时候，没有指定扩展名的时候，会自动寻找哪些扩展名
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                        '@babel/preset-typescript'
                    ],
                    plugins: [
                        ['import', { libraryName: 'antd', style: 'css' }] //按需加载antd；默认引less，我们引css
                    ]
                },
                include: path.resolve('src'),
                exclude: /node_modules/
            },
            {
                test: /\.less/,
                use: [
                    "style-loader",
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 3 }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['autoprefixer']
                            }
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.css/, //解析antd的index.css文件
                use: [
                    "style-loader",
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['autoprefixer']
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|svg|jpeg)$/,
                type: 'asset'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { from: path.resolve(__dirname, 'static'), to: path.resolve(__dirname, 'dist') }
        //     ]
        // })
    ]
}
/**
 * 样式
 * .less => css文件内容 => 把所有的px转成rem => 处理css兼容，添加厂商前缀 => 处理import和url => 把css文件变成style标签插入页面
 */