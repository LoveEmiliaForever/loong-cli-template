const ENV = process.env.ENV
const isProd = ENV === 'production'
const sourceMapFlag = process.env.SOURCEMAP // Boolean
const sourceMapType = isProd ? 'hidden-source-map' : 'source-map' // source-map hidden-source-map nosources-source-map

const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const ESLintPlugin = require('eslint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer')
const HappyPack = require('happypack')
const DashboardPlugin = require('webpack-dashboard/plugin')
const SizePlugin = require('size-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const webpack = require('webpack')

module.exports = smp.wrap({
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: isProd ? '/js/[name]@[chunkhash].js' : '/js/[name].js',
        chunkFilename: isProd ? '/js/[name]@async@[chunkhash].js' : '/js/[name]@async.js',
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                include: /src/,
                use: 'vue-loader'
            },
            {
                test: /\.ts$/,
                include: /src/,
                use: 'happypack/loader?id=ts'
            },
            {
                test: /\.js$/,
                include: /src/,
                enforce: 'post',
                use: 'happypack/loader?id=babel'
            },
            {
                test: /\.css$/,
                include: /src/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './css/',
                            sourceMap: sourceMapFlag
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: sourceMapFlag
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: sourceMapFlag
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: sourceMapFlag
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|avif|webp)/,
                include: /src/,
                type: 'asset/resource',
                generator: {
                    filename: '/assets/images/[name]@import.[ext]',
                    publicPath: './assets/images/'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)/,
                include: /src/,
                type: 'asset/resource',
                generator: {
                    filename: '/assets/fonts/[name]@import.[ext]',
                    publicPath: './assets/fonts/'
                }
            },
            {
                test: /\.(mp4|avi|mkv|flv)/,
                include: /src/,
                type: 'asset/resource',
                generator: {
                    filename: '/assets/videos/[name]@import.[ext]',
                    publicPath: './assets/videos/'
                }
            },
            {
                test: /\.(mp3|wav|flac|aac|wma)/,
                include: /src/,
                type: 'asset/resource',
                generator: {
                    filename: '/assets/audios/[name]@import.[ext]',
                    publicPath: './assets/audios/'
                }
            }
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\/src/,
                parallel: true,
                sourceMap: sourceMapFlag
            }),
            new CssMinimizerPlugin({
                include: /\/src/,
                parallel: true
            })
        ]
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.runtime.esm-bundler.js'
        },
        extensions: ['.js', '.vue']
    },
    plugin: [
        new webpack.DefinePlugin({
            AUTHOR: JSON.stringify('LoveEmiliaForever')
        }),
        new HappyPack({
            id: 'babel',
            loaders: [{
                loader: 'babel-loader'
            }]
        }),
        new HappyPack({
            id: 'ts',
            loaders: [{
                loader: 'ts-loader'
            }]
        }),
        new VueLoaderPlugin(),
        new ESLintPlugin({
            overrideConfigFile: path.join(__dirname, '.eslintrc.js'),
            extensions: ['js', 'ts'],
            exclude: ['node_modules/**'],
            include: ['src/**/*']
        }),
        new MiniCssExtractPlugin({
            filename: '[name]@import.css',
            chunkFilename: '[name]@async.css'
        }),
        new CopyWebpackPlugin([
            { from: './src/assets', to: 'assets' }
        ]),
        new webpack.DllReferencePlugin({
            manifest: require(path.join(__dirname, '/src/dll/manifest.json'))
        }),
        new HtmlWebpackPlugin({
            title: 'my-web',
            filename: 'index.html',
            template: './src/template.html',
            favicon: './src/assets/images/loong.ico',
            chunks: ['index']
        }),
        new BundleAnalyzer(),
        new SizePlugin(),
        new DashboardPlugin()
    ],
    devtool: sourceMapFlag ? sourceMapType : false,
    mode: ENV,
    devServer: {
        publicPath: '/dist/' //是该地址，则返回内存中的打包结果，否则返回源文件
    },
})